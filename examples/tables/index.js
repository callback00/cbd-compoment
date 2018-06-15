import React from 'react'

import Simple from './simple-desc'
import AutoMerge from './autoMerge-desc'
import ScrollX from './scrollX-desc'
import ScrollY from './scrollY-desc'
import ScrollXY from './scrollXY-desc'
import FixedTable from './fixedTable-desc'
import CustomTable from './customTable-desc'

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
                <ScrollX />
                <ScrollY />
                <ScrollXY />
                <FixedTable />
                <CustomTable />
            </div>
        )
    };
};

export default Index