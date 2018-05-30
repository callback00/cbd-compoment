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

                {/* <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.simpleColumns}
                        data={TestDataModel.data}
                        bordered={false}
                    />
                </div> */}

                {/* 测试大量数据时的渲染速度 */}
                <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={TestDataModel.columns}
                        data={TestDataModel.getLargeData()}
                        autoMergeCell={true}

                    />
                </div>

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