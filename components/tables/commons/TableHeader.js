import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ColGroup from './ColGroup';
import ColumnManager from '../utils/ColumnManager';

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

function renderHeadRow(rows) {
    const headRow = rows.map((rowColumns, rowIndex) => {
        return (
            <tr key={`row-${rowIndex}`}>
                {
                    rowColumns.map((column, index) => {
                        return (
                            <th key={`${rowIndex}-${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >{column.title}</th>
                        )
                    })
                }
            </tr>
        )
    })

    return (headRow)
}

export default function TableHeader(props) {

    const { prefixCls, columns, fixed } = props;

    const columnManager = new ColumnManager(columns);
    const newcolumns = columnManager.groupedColumns();

    const rows = getHeaderRows(newcolumns);

    return (
        <table>
            <ColGroup columns={columnManager.getLeafColumns()} />
            <thead>
                {
                    renderHeadRow(rows)
                }
            </thead>
        </table>
    );
}

TableHeader.propTypes = {
    prefixCls: PropTypes.string,
    fixed: PropTypes.bool,
    columns: PropTypes.array.isRequired,
};

TableHeader.defaultProps = {
    fixed: false,
    columns: []
};