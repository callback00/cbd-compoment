import React from 'react';

// 该功能还未实现
class ExpandableTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data, childrenColumnName, children } = this.props;
        return children({
            test: '1'
        });
    }
}

export default ExpandableTable