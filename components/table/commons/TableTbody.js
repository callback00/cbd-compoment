import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableTbodyRow from './TableTbodyRow'

function renderRow(data, columns, fixed, prefixCls, pubStore, onRow, onCell) {
    const rows = data.map((rowData, rowIndex) => {
        return (
            <TableTbodyRow key={rowIndex}
                rowData={rowData}
                rowIndex={rowIndex}
                columns={columns}
                fixed={fixed}
                prefixCls={prefixCls}
                pubStore={pubStore}
                onRow={onRow}
                onCell={onCell}
            />
        )
    })

    return rows
}

export default function TableTbody(props) {
    const { prefixCls, columns, data, fixed, pubStore, onRow, onCell } = props;

    return (
        <tbody>
            {
                renderRow(data, columns, fixed, prefixCls, pubStore, onRow, onCell)
            }
        </tbody>
    )
}

