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

        // this.dataManager = new DataManager(this.props.data);
        // this.columnManager = new ColumnManager(this.props.columns);
    }

    render() {
        const { prefixCls, bordered, autoMergeCell, scroll, fixed, pubStore } = this.props;

        let columns = this.props.columnManager.getLeafColumns();

        const data = this.props.dataManager.groupedData(columns, autoMergeCell);

        const maxHeight = scroll.y || 'auto';
        let width = scroll.x || 'auto';

        let overflowY = scroll.y ? 'scroll' : 'auto';
        let overflowX = scroll.x ? 'auto' : 'hidden';

        if (fixed) {
            columns = columns.filter(columns => columns.fixed === fixed);
            width = 'auto';
            overflowY = 'hidden';
        }

        const divcls = classNames({
            [`${prefixCls}-scroll-body`]: true,
            [`fixed`]: fixed ? true : false
        });

        const cls = classNames({
            [`${prefixCls}-body`]: true
        });

        const refName = fixed ? `tbodyTable-${fixed}` : 'tbodyTable'

        return (
            // 这一层的作用是出现滚动条时仍有底边框
            <div className={divcls}>
                <div ref={(element) => { this.props.saveRef(refName, element) }} style={{ maxHeight, overflowY, overflowX }} className={cls} onScroll={this.props.handleBodyScroll} >
                    <table style={{ width }} >
                        <ColGroup columns={columns} />
                        <TableTbody prefixCls={prefixCls} columns={columns} data={data} fixed={fixed} pubStore={pubStore} />
                    </table>

                </div>
            </div>
        )
    }
}

export default BodyTable
