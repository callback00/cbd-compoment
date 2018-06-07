import React from 'react';

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