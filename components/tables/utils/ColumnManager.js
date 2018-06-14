// 计算columns的rowSpan和colSpan
// 跟我的思路差不多，都是遍历到叶子节点后反算上一层节点的colspan
function calculateRowSpanAndColSapn(columns, currentRow = 0, parentColumn = {}, rows = []) {
    // track how many rows we got
    rows[currentRow] = rows[currentRow] || [];
    const grouped = [];

    const setRowSpan = column => {
        const rowSpan = rows.length - currentRow;
        if (
            column &&
            !column.children && // parent columns are supposed to be one row
            rowSpan > 1 &&
            (!column.rowSpan || column.rowSpan < rowSpan)
        ) {
            column.rowSpan = rowSpan;
        }
    };

    columns.forEach((column, index) => {
        const newColumn = { ...column };
        rows[currentRow].push(newColumn);
        parentColumn.colSpan = parentColumn.colSpan || 0;
        if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = calculateRowSpanAndColSapn(newColumn.children, currentRow + 1, newColumn, rows);
            parentColumn.colSpan += newColumn.colSpan;
        } else {
            parentColumn.colSpan++;
        }
        // update rowspan to all same row columns
        for (let i = 0; i < rows[currentRow].length - 1; ++i) {
            setRowSpan(rows[currentRow][i]);
        }
        // last column, update rowspan immediately
        if (index + 1 === columns.length) {
            setRowSpan(newColumn);
        }
        grouped.push(newColumn);
    });

    return grouped;
}

//将树形结构的叶子项扁平化处理，它这个写得比我以前写的好，我以前写的是calculateRowSpanAndColSapn 与 flattenColumns一起获取的递归，这个分两步后简化了逻辑，代码很简单
function flattenColumns(columns = []) {
    const newColumns = [];
    columns.forEach(column => {
        if (!column.children) {
            newColumns.push(column);
        } else {
            newColumns.push(...flattenColumns(column.children));
        }
    });

    return newColumns;
}

// 为了研究性能优化方面的事情，先去掉函数缓存的代码
class ColumnManager {

    constructor(columns) {
        this.columns = columns,
            this.cached = {} // 缓存
    }

    groupedColumns() {
        return calculateRowSpanAndColSapn(this.columns);
    }

    // 获取叶子列
    getLeafColumns() {
        return flattenColumns(this.columns);
    }
}

export default ColumnManager