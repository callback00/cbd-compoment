import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// 将树形数据解析为二维数组，一维表示表示行，二维表示列
// 修改了一些多余的代码，改成这样更清晰一些
function getHeaderRows(columns, currentRow = 0, rows) {
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    columns.forEach(column => {
        const cell = {
            title: column.title,
            className: column.className || '',
            column,
        };

        if (column.children) {
            getHeaderRows(column.children, currentRow + 1, rows);
        } else {
            // 用于判断边框显示
            cell.isLeaf = true
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
    return rows.filter(row => row.length > 0);
}

function renderHeadRow(rows, bordered) {
    const headRow = rows.map((rowColumns, rowIndex) => {
        return (
            <tr key={`row-${rowIndex}`}>
                {
                    rowColumns.map((column, index) => {
                        const style = !bordered && !column.isLeaf ? { borderBottom: 'none' } : {}

                        return (
                            <th style={style} key={`${rowIndex}-${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >{column.title}</th>
                        )
                    })
                }
            </tr>
        )
    })

    return (headRow)
}

export default function TableHeader(props) {

    const { prefixCls, bordered, columns, fixed } = props;

    const rows = getHeaderRows(columns);

    return (
        <thead>
            {
                renderHeadRow(rows, bordered)
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