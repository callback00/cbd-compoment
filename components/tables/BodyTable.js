import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableTbody from './commons/TableTbody'
import ColGroup from './commons/ColGroup';
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

    render() {
        const { prefixCls, bordered, autoMergeCell, scroll } = this.props;

        const columns = this.columnManager.getLeafColumns()
        const data = this.dataManager.groupedData(columns, autoMergeCell)

        const maxHeight = scroll.y || 'auto'
        const width = scroll.x || 'auto'

        const overflowY = scroll.y ? 'scroll' : 'auto'
        const overflowX = scroll.x ? 'auto' : 'hidden'

        var cls = classNames({
            [`${prefixCls}-body`]: true
        });

        return (
            // 这一层的作用是出现滚动条时仍有底边框
            <div className={`${prefixCls}-scroll-body`}>
                <div style={{ maxHeight, overflowY, overflowX }} className={cls} onScroll={this.props.handleBodyScroll} >
                    <table style={{ width }} >
                        <ColGroup columns={columns} />
                        <TableTbody prefixCls={prefixCls} autoMergeCell={autoMergeCell} scroll={scroll} columns={columns} data={data} />
                    </table>

                </div>
            </div>
        )
    }
}

export default BodyTable
