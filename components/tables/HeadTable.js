import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableHeader from './commons/TableHeader';
import ColGroup from './commons/ColGroup';
import ColumnManager from './utils/ColumnManager';

class HeadTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        // this.columnManager = new ColumnManager(this.props.columns);
    }

    render() {

        const { prefixCls, bordered, fixed, scroll = {} } = this.props;
        // 获取新columns，格式与原始数据一致，多了rowspan和colspan而已
        const columns = this.props.columnManager.groupedColumns();

        const overflowY = scroll.y ? 'scroll' : 'auto'
        const width = scroll.x || 'auto'

        var cls = classNames({
            [`${prefixCls}-head`]: true
        });

        const refName = fixed ? `headTable-${fixed}` : 'headTable'
        return (
            <div ref={(element) => { this.props.saveRef(refName, element) }} style={{ overflowY, overflowX: 'hidden' }} onScroll={this.props.handleSynchroBodyScroll} className={cls}>
                <table style={{ width }} >
                    <ColGroup columns={this.props.columnManager.getLeafColumns()} />
                    <TableHeader prefixCls={prefixCls} bordered={bordered} columns={columns} fixed={fixed} />
                </table>
            </div>
        )
    }
}

export default HeadTable