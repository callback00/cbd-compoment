import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TableHeader from './commons/TableHeader'

class HeadTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { prefixCls, columns, scroll = {} } = this.props;

        const fixed = scroll.y ? true : false

        return (
            <div className={`${prefixCls}-head`}>
                <TableHeader fixed={fixed} prefixCls={prefixCls} columns={columns} />
            </div>
        )
    }
}

export default HeadTable