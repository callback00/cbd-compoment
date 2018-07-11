import React from 'react'

class TableHeaderRow extends React.Component {
    constructor(props) {
        super(props)

        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    componentDidMount() {
        this.handleFixedTableRowHeight();
    }

    componentDidUpdate() {
        this.handleFixedTableRowHeight();
    }

    onColumnResizeMouseDown(dataIndex, e) {
        this.clientSpaner = e.target

        this.startX = e.pageX
        this.changeColumnDataIndex = dataIndex
        this.clientSpaner.style.backgroundColor = '#34c3ff'
        this.keyDown = true
        this.addDocumentMouseEvents();
    }

    addDocumentMouseEvents() {
        document.addEventListener("mousemove", this.onMouseMove, false);
        document.addEventListener("mouseup", this.onMouseUp, false);
    }

    onMouseMove(e) {
        e.preventDefault()

        let newColWidth = this.clientSpaner.parentNode.clientWidth + (e.pageX - this.startX)
        newColWidth = newColWidth > 24 ? newColWidth : 24

        this.clientSpaner.style.left = newColWidth + 'px'
    }

    onMouseUp(e) {
        document.removeEventListener("mousemove", this.onMouseMove, false)
        document.removeEventListener("mouseup", this.onMouseUp, false)

        this.clientSpaner.style.backgroundColor = 'transparent'

        let newColWidth = this.clientSpaner.parentNode.clientWidth + (e.pageX - this.startX)
        // 保留最小宽度，即保留2个字节的大小，2*12
        newColWidth = newColWidth > 24 ? newColWidth : 24

        this.clientSpaner.style.left = 'unset';

        const changeColumnDataIndex = this.changeColumnDataIndex
        if (this.props.pubStore) {
            this.props.pubStore.handleColumnsSize(changeColumnDataIndex, newColWidth)
        }
        this.changeColumnDataIndex = null
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

            this.refItem.style.height = trHeight + 'px'
        }
    }

    renderRow(index, column, style) {
        if (this.props.fixed) {

            if (this.props.fixed === column.column.fixed) {
                return (
                    <th style={style} key={`${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >
                        {column.title}
                    </th>
                )
            } else {
                return null
            }

        } else {
            return (
                <th style={style} key={`${index}`} rowSpan={column.rowSpan || 1} colSpan={column.colSpan || 1} >
                    {column.title}
                    <div className='lyj-table-column-resize-spanner' style={{ display: column.isLeaf ? 'block' : 'none' }}
                        onMouseDown={this.onColumnResizeMouseDown.bind(this, column.column.dataIndex)}
                    />
                </th>
            )
        }
    }

    render() {

        const { rowColumns, bordered } = this.props
        return (
            <tr ref={element => this.refItem = element}>
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