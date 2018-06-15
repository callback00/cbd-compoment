import React from 'react'
import Example from './simple'

import SyntaxHighlighter from 'react-syntax-highlighter/prism';


class Simple_desc extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>

                <p style={{ paddingBottom: '10px', fontSize: '20px' }} >简单表格使用</p>
                <Example />

                <div>
                    <SyntaxHighlighter language='jsx'>
                        {
                            `
import React from 'react'

import Table from '../../components/tables/Index'

import TestDataModel from '../../public/data/tableTest'

const Column = Table.Column

class Index extends React.Component {
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
                <button onClick={this.changeData.bind(this)} >改变数据</button>

                <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={TestDataModel.getLargeData()}
                        autoMergeCell={false}
                        scroll={{ x: '110%', y: 400 }}
                        bordered={false}
                        expandedRowRender={(text, record, rowIndex) => { return (<div>test</div>) }}
                        onRow={(record, index) => {
                            return ({
                                onClick: this.onRowClick.bind(this, record, index),
                                className: 'indexClass',
                                ref: ''
                            })
                        }}
                        onCell={(key, record, index) => {
                            return ({
                                className: 'testCell'
                            })
                        }}
                    />
                </div>

                {/* 测试大量数据时的渲染速度 */}
                {/* <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={this.state.changeFlag ? TestDataModel.getLargeData() : TestDataModel.data}
                        // autoMergeCell={true}
                        bordered={false}
                        scroll={{ x: 1800, y: 400 }}
                    />
                </div> */}

                {/* <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={TestDataModel.data}
                        autoMergeCell={true}
                        bordered={false}
                    />
                </div> */}

                {/* <div style={{ padding: '0 20px', marginBottom: '15px', width: '800px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={TestDataModel.data}
                        autoMergeCell={true}
                        scroll={{ y: 500, x: 1200 }}
                        locale={{ emptyText: '暂无数据' }}
                        bordered={true}
                    />
                </div> */}
            </div>
        )
    };
};

export default Index
                    `
                        }
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    };
};

export default Simple_desc