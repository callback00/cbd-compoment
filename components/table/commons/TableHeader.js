import React from 'react';
import PropTypes from 'prop-types';

import TableHeaderRow from './TableHeaderRow'

// 将树形数据解析为二维数组，一维表示表示行，二维表示列
// 固定列只返回叶子节点的二维数组列，数据列需返回要显示的二维数组列
function getHeaderRows(columns, fixed, currentRow = 0, rows, fixedRows) {
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    // 与rows的数据结构保持一致，如果是固定列返回该数组
    fixedRows = fixedRows || [[]]

    columns.forEach(column => {
        const cell = {
            title: column.title,
            className: column.className || '',
            column,
        };

        if (column.children) {
            getHeaderRows(column.children, fixed, currentRow + 1, rows, fixedRows);
        } else {
            // 用于判断边框显示
            cell.isLeaf = true
            if (fixed && cell.column.fixed === fixed) {
                fixedRows[0].push(cell)
            }
        }
        if ('colSpan' in column) {
            cell.colSpan = column.colSpan;
        }
        if ('rowSpan' in column) {
            cell.rowSpan = column.rowSpan;
        }
        if (cell.colSpan !== 0) {
            rows[currentRow].push(cell);
        }
    });
    if (fixed) {
        return fixedRows
    } else {
        return rows.filter(row => row.length > 0);
    }
}

function renderHeadRow(rows, bordered, pubStore, fixed) {
    const headRow = rows.map((rowColumns, rowIndex) => {
        return (
            <TableHeaderRow key={rowIndex} rowIndex={rowIndex} fixed={fixed} rowColumns={rowColumns} bordered={bordered} pubStore={pubStore} />
        )
    })

    return (headRow)
}

export default function TableHeader(props) {

    const { prefixCls, bordered, columns, fixed, pubStore } = props;

    // 当表是固定列表头时，只需取叶节点即可，返回的数据是二维数组
    let rows = getHeaderRows(columns, fixed);

    return (
        <thead>
            {
                renderHeadRow(rows, bordered, pubStore, fixed)
            }
        </thead>

    );
}

TableHeader.propTypes = {
    prefixCls: PropTypes.string,
    fixed: PropTypes.string,
    columns: PropTypes.array.isRequired,
};

TableHeader.defaultProps = {
    columns: []
};