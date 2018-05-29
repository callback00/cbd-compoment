import React from 'react'

import Table from '../../components/tables/Index'

import TestDataModel from '../../public/data/tableTest'

const Column = Table.Column

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Table
                    columns={TestDataModel.columns}
                    data={TestDataModel.data}
                    autoMergeCell={true}
                    scroll={{ y: 100 }}
                />
            </div>
        )
    };
};

export default Index