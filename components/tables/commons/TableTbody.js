import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableTbodyRow from './TableTbodyRow'

// function renderCell(row, rowIndex, columns, fixed) {
//     const cells = [];

//     let i = 0
//     // 如果直接遍历row的属性会出现属性顺序问题

//     columns.forEach((columnItem, index) => {
//         const key = columnItem.dataIndex || columnItem.key
//         if (row[key].visible) {

//             const temp = typeof row[key].value

//             if (typeof row[key].value !== 'function' && typeof row[key].value !== 'string') {
//                 row[key].value = ''
//             }
//             const cell = (
//                 <td key={index} rowSpan={row[key].rowSpan} >
//                     {
//                         typeof row[key].value === 'function'
//                             ? row[key].value(row.orgRecord[key], row.orgRecord, rowIndex)
//                             : row[key].value
//                     }
//                 </td>
//             );

//             //如果是固定列的表格
//             if (fixed) {
//                 if (fixed === columnItem.fixed) {
//                     cells.push(cell)
//                 }
//             } else {
//                 cells.push(cell)
//             }
//         }
//     });

//     return (cells)
// }

function renderRow(data, columns, fixed, pubStore) {
    const rows = data.map((rowData, rowIndex) => {
        return (
            <TableTbodyRow key={rowIndex} rowData={rowData} rowIndex={rowIndex} columns={columns} fixed={fixed} pubStore={pubStore} />
            // <tr key={`row-${rowIndex}`} >
            //     {
            //         renderCell(rowData, rowIndex, columns, fixed)
            //     }
            // </tr>
        )
    })

    return rows
}

export default function TableTbody(props) {
    const { prefixCls, columns, data, fixed, pubStore } = props;

    return (
        <tbody>
            {
                renderRow(data, columns, fixed, pubStore)
            }
        </tbody>
    )
}

