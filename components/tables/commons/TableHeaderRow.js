import React from 'react'

class TableHeaderRow extends React.Component {
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
                this.props.pubStore.setFixedHeaderRowHeightArry(this.props.rowIndex, height)
            }
        } else {

            const fixedHeaderRowHeightArry = this.props.pubStore.getFixedHeaderRowHeightArry();
            let trHeight = 0;

            for (const key in fixedHeaderRowHeightArry) {
                trHeight += fixedHeaderRowHeightArry[key]
            }

            // trHeight = fixedHeaderRowHeightArry[this.props.rowIndex]

            this.refItem.style.height = trHeight + 'px'
        }
    }

    renderRow(index, column, style) {
        if (this.props.fixed) {

            if (this.props.fixed === column.column.fixed) {
                return (
                    <th style={style} key={`${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >{column.title}</th>
                )
            } else {
                return null
            }

        } else {
            return (
                <th style={style} key={`${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >{column.title}</th>
            )
        }
    }

    render() {

        const { rowColumns, bordered } = this.props
        return (
            <tr ref={element => this.refItem = element} >
                {
                    rowColumns.map((column, index) => {
                        const style = !bordered && !column.isLeaf ? { borderBottom: 'none' } : {}

                        return (
                            this.renderRow(index, column, style)
                        )
                    })
                }
            </tr>
        )
    }
}

export default TableHeaderRow