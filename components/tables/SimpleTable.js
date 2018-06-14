import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ColGroup from './commons/ColGroup';
import ColumnManager from './utils/ColumnManager';
import DataManager from './utils/DataManager'
import TableHeader from './commons/TableHeader'
import TableTbody from './commons/TableTbody'

class HeadTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { prefixCls, bordered, autoMergeCell, scroll = {}, onRow, onCell } = this.props;

        const headerColumns = this.props.columnManager.groupedColumns();
        const columns = this.props.columnManager.getLeafColumns()
        const data = this.props.dataManager.groupedData(columns, autoMergeCell)

        return (
            <div className={`${prefixCls}-simple`}>
                <table>
                    <ColGroup columns={columns} />
                    <TableHeader bordered={bordered} prefixCls={prefixCls} columns={headerColumns} />
                    <TableTbody prefixCls={prefixCls} autoMergeCell={autoMergeCell} scroll={scroll} columns={columns} data={data} onRow={onRow} onCell={onCell} />
                </table>
            </div>
        )
    }
}

export default HeadTable