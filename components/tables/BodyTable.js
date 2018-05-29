import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ColGroup from './commons/ColGroup'
import DataManager from './utils/DataManager'
import ColumnManager from './utils/ColumnManager';

class BodyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.dataManager = new DataManager(this.props.data);
        this.columnManager = new ColumnManager(this.props.columns);
    }

    renderCell(row, rowIndex, columns) {
        const cells = [];

        let i = 0
        // 如果直接遍历row的属性会出现属性顺序问题

        columns.forEach((columnItem, index) => {
            const key = columnItem.dataIndex || columnItem.key
            if (row[key].visible) {

                const temp = typeof row[key].value

                const cell = (
                    <td key={index} rowSpan={row[key].rowSpan} >
                        {
                            typeof row[key].value === 'function'
                                ? row[key].value(row.orgRecord[key], row.orgRecord, rowIndex)
                                : row[key].value
                        }
                    </td>
                );
                cells.push(cell)
            }
        });

        return (cells)
    }

    renderRow(data, columns) {
        const rows = data.map((row, rowIndex) => {
            return (
                <tr key={`row-${rowIndex}`} >
                    {
                        this.renderCell(row, rowIndex, columns)
                    }
                </tr>
            )
        })

        return rows
    }

    render() {
        const { prefixCls, autoMergeCell, scroll } = this.props;
        const columns = this.columnManager.getLeafColumns()
        const newData = this.dataManager.groupedData(columns, autoMergeCell)

        return (
            <div className={`${prefixCls}-body`} >
                <table>
                    <ColGroup columns={columns} />
                    <tbody>
                        {
                            this.renderRow(newData, columns)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BodyTable
