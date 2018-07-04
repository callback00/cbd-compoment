import React from 'react'
import { Menu } from '../../components/components'

class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100vh' }} >
                <Menu>
                </Menu>
            </div>
        );
    };
};

export default Index