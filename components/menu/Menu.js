import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.mousePosition = null;
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return null;
    };
};

Menu.defaultProps = {
    onClose: () => { }
}

export default Menu