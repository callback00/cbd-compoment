import React from 'react'
import Example from './autoMerge'

import SyntaxHighlighter from 'react-syntax-highlighter/prism';


class autoMerge_desc extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <Example />
                <SyntaxHighlighter language='jsx'>
                    {
                        `
                        import React from 'react'

import Table from '../../components/tables/Index'

import TestDataModel from '../../public/data/tableTest'

const Column = Table.Column

class autoMerge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changeFlag: false
        }
    }

    changeData() {
        const changeFlag = !this.state.changeFlag;
        this.setState({
            changeFlag
        });
    }

    onRowClick(record, index) {
        console.log(this.state.changeFlag)
    }

    render() {
        return (
            <div>
                <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={TestDataModel.getLargeData()}
                        autoMergeCell={true}
                    />
                </div>
            </div>
        )
    };
};

export default autoMerge
                        `
                    }
                </SyntaxHighlighter>
            </div>
        )
    }
}

export default autoMerge_desc