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

        this.dataManager = new DataManager(this.props.data);
        this.columnManager = new ColumnManager(this.props.columns);
    }

    render() {

        const { prefixCls, bordered, autoMergeCell, scroll = {} } = this.props;

        const fixed = scroll.y ? true : false

        const headerColumns = this.columnManager.groupedColumns();

        const columns = this.columnManager.getLeafColumns()
        const data = this.dataManager.groupedData(columns, autoMergeCell)

        return (
            <div className={`${prefixCls}-simple`}>
                <table>
                    <ColGroup columns={columns} />
                    <TableHeader fixed={fixed} bordered={bordered} prefixCls={prefixCls} columns={headerColumns} />
                    <TableTbody prefixCls={prefixCls} autoMergeCell={autoMergeCell} scroll={scroll} columns={columns} data={data} />
                </table>
            </div>
        )
    }
}

export default HeadTable