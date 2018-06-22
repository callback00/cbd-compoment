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
    }

    render() {

        const { prefixCls, bordered, fixed, scroll = {} } = this.props;
        // 获取新columns，格式与原始数据一致，多了rowspan和colspan而已
        let columns = this.props.columnManager.groupedColumns();

        let overflowY = scroll.y ? 'scroll' : 'auto'
        let width = scroll.x || 'auto'

        var cls = classNames({
            [`${prefixCls}-head`]: true,
            ['fixed']: fixed ? true : false
        });

        let leafColumns = this.props.columnManager.getLeafColumns();

        // fixed的table要处理下宽度的样式
        if (fixed) {
            width = 'auto';
            overflowY = 'auto';
            leafColumns = leafColumns.filter(columns => columns.fixed === fixed);
        }

        const refName = fixed ? `headTable-${fixed}` : 'headTable'
        return (
            <div ref={(element) => { this.props.saveRef(refName, element) }} style={{ overflowY, overflowX: 'hidden' }} className={cls}>
                <table style={{ width }} >
                    <ColGroup columns={leafColumns} />
                    <TableHeader prefixCls={prefixCls} bordered={bordered} columns={columns} fixed={fixed} pubStore={this.props.pubStore} />
                </table>
            </div>
        )
    }
}

export default HeadTable