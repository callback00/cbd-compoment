import React from 'react';
import ColGroup from './commons/ColGroup';
import TableHeader from './commons/TableHeader'
import TableTbody from './commons/TableTbody'
import createPubStore from './utils/PubStore'

class HeadTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.pubStore = createPubStore({ handleColumnsSize: this.handleColumnsSize.bind(this) });
    }

    // 调整列宽
    handleColumnsSize(changeColumnDataIndex, width) {

        this.props.columnManager.leafColumns.forEach((element, index) => {
            if (element.dataIndex === changeColumnDataIndex) {
                this.props.columnManager.leafColumns[index].width = width;
            }
        });
        this.forceUpdate();
    }

    render() {

        const { prefixCls, bordered, autoMergeCell, scroll = {}, onRow, onCell } = this.props;

        const headerColumns = this.props.columnManager.groupedColumns();
        const columns = this.props.columnManager.leafColumns;
        const data = this.props.dataManager.groupedData(columns, autoMergeCell)

        return (
            <div className={`${prefixCls}-simple`}>
                <table>
                    <ColGroup columns={columns} />
                    <TableHeader bordered={bordered} prefixCls={prefixCls} columns={headerColumns} pubStore={this.pubStore} />
                    <TableTbody prefixCls={prefixCls} autoMergeCell={autoMergeCell} scroll={scroll} columns={columns} data={data} onRow={onRow} onCell={onCell} />
                </table>
            </div>
        )
    }
}

export default HeadTable