import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableTbodyRow from './TableTbodyRow'

function renderRow(data, columns, fixed, pubStore) {
    const rows = data.map((rowData, rowIndex) => {
        return (
            <TableTbodyRow key={rowIndex} rowData={rowData} rowIndex={rowIndex} columns={columns} fixed={fixed} pubStore={pubStore} />
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

