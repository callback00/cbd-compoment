import React from 'react'

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

    renderCell(row, rowIndex, columns, fixed) {
        const cells = [];

        let i = 0
        // 如果直接遍历row的属性会出现属性顺序问题

        columns.forEach((columnItem, index) => {
            const key = columnItem.dataIndex || columnItem.key
            if (row[key].visible) {

                const temp = typeof row[key].value

                if (typeof row[key].value !== 'function' && typeof row[key].value !== 'string') {
                    row[key].value = ''
                }
                const cell = (
                    <td key={index} rowSpan={row[key].rowSpan} >
                        {
                            typeof row[key].value === 'function'
                                ? row[key].value(row.orgRecord[key], row.orgRecord, rowIndex)
                                : row[key].value
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

        const { rowData, rowIndex, columns, fixed } = this.props
        return (
            <tr ref={element => this.refItem = element} key={`row-${rowIndex}`} >
                {
                    this.renderCell(rowData, rowIndex, columns, fixed)
                }
            </tr>
        )
    }
}

export default TableTbodyRow