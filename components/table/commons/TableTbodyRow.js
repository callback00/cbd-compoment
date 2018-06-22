import React from 'react'
import classNames from 'classnames';
import { warningOnce } from '../utils/UtilTools'

class TableTbodyRow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.handleFixedTableRowHeight();
    }

    componentDidUpdate() {
        this.handleFixedTableRowHeight();
    }

    handleFixedTableRowHeight() {
        if (!this.props.fixed) {
            if (this.props.pubStore) {
                const height = this.refItem.getBoundingClientRect().height
                this.props.pubStore.setFixedTbodyRowHeightArry(this.props.rowIndex, height)
            }
        } else {

            const fixedTbodyRowHeightArry = this.props.pubStore.getFixedTbodyRowHeightArry();
            let trHeight = 0;

            this.refItem.style.height = fixedTbodyRowHeightArry[this.props.rowIndex] + 'px'
        }
    }

    renderCell(row, rowIndex, columns, fixed, onCell) {
        const cells = [];

        let i = 0
        // 如果直接遍历row的属性会出现属性顺序问题

        columns.forEach((columnItem, index) => {
            const key = columnItem.dataIndex || columnItem.key
            if (row[key].visible) {

                let tdValue = null;
                let rowSpan = row[key].rowSpan;
                let colSpan = 1;

                if (columnItem.render) {
                    const tdObject = columnItem.render(row.orgRecord[key], row.orgRecord, rowIndex);
                    if (React.isValidElement(tdObject)) {
                        tdValue = tdObject
                    } else {
                        if (typeof tdObject === 'object') {
                            tdValue = ''
                        } else {
                            tdValue = tdObject;
                        }
                    }

                } else {
                    if (typeof row[key].value === 'object') {
                        tdValue = ''
                    } else {
                        tdValue = row[key].value
                    }
                }

                const cellCustomAttribute = onCell(key, row.orgRecord, rowIndex)

                const cell = (
                    <td key={index} rowSpan={rowSpan} colSpan={colSpan} {...cellCustomAttribute} >
                        {
                            tdValue
                        }
                    </td>
                );

                //如果是固定列的表格
                if (fixed) {
                    if (fixed === columnItem.fixed) {
                        cells.push(cell)
                    }
                } else {
                    cells.push(cell)
                }
            }
        });

        return (cells)
    }

    render() {

        const { rowData, rowIndex, columns, fixed, prefixCls, onRow, onCell } = this.props

        const rowCustomAttribute = onRow(rowData.orgRecord, rowIndex)

        // 防止修改ref导致计算行高出错
        if (rowCustomAttribute && 'ref' in rowCustomAttribute) {
            warningOnce(`不支持ref的定义，原代码中已经使用了ref`);
            delete rowCustomAttribute.ref
        }

        return (
            <tr ref={element => this.refItem = element} key={`row-${rowIndex}`} {...rowCustomAttribute} >
                {
                    this.renderCell(rowData, rowIndex, columns, fixed, onCell)
                }
            </tr>
        )
    }
}

export default TableTbodyRow
