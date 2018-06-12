import React from 'react'

import Simple from './simple-desc'
import AutoMerge from './autoMerge-desc'

import Table from '../../components/tables/Index'

const Column = Table.Column

class Index extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <Simple />
                <AutoMerge />
            </div>
        )
    };
};

export default Index