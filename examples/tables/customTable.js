import React from 'react'

import { Table } from '../../components/components'

import TestDataModel from '../../public/data/tableTest'

const Column = Table.Column

class CustomTable extends React.Component {
    constructor(props) {
        super(props)
    }

    onRowClick(record, index) {
        console.log('onRowClick excuting')
    }

    render() {

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                render: (text, record, index) => {
                    return (
                        <div>{text}</div>
                    )
                }
            },
            {
                title: '其他信息',
                children: [
                    {
                        title: '年龄',
                        dataIndex: 'age',
                        key: 'age',
                        width: 50,
                    },
                    {
                        title: '地址',
                        children: [
                            {
                                title: '街道',
                                dataIndex: 'street',
                                key: 'street',
                                width: 200,
                            },
                            {
                                title: '区域',
                                children: [
                                    {
                                        title: '建筑',
                                        dataIndex: 'building',
                                        key: 'building',
                                        width: 100
                                    },
                                    {
                                        title: '门牌号',
                                        dataIndex: 'number',
                                        key: 'number',
                                        width: 100,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: '就职公司',
                children: [
                    {
                        title: '公司地址',
                        dataIndex: 'companyAddress',
                        key: 'companyAddress'
                    },
                    {
                        title: '公司名称',
                        dataIndex: 'companyName',
                        key: 'companyName'
                    }
                ]
            },
            {
                title: (
                    <a href='#'>
                        性别
                    </a>
                ),
                dataIndex: 'gender',
                key: 'gender',
                width: 60,
            },
            {
                title: '操作',
                dataIndex: '',
                key: '1',
                width: 160,
                render() {
                    return <a href="#">Operations</a>;
                },
            },
            {
                title: '自定义渲染',
                dataIndex: '',
                key: '2',
                width: 160,
                render(text, record, index) {
                    return (
                        <input style={{ width: '100%', boxSizing: 'border-box' }} />
                    );
                },
            }
        ]

        return (
            <div>
                <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={columns}
                        data={TestDataModel.getLargeData()}
                        autoMergeCell={false}
                        scroll={{ x: '110%', y: 400 }}
                        expandedRowRender={(text, record, rowIndex) => { return (<div>test</div>) }}
                        onRow={(record, index) => {
                            if (index === 2) {
                                return ({
                                    onClick: this.onRowClick.bind(this, record, index),
                                    className: 'indexClass',
                                    style: { background: '#2db7f5', color: '#fff' },
                                    ref: ''
                                })
                            } else {
                                return ({
                                    onClick: this.onRowClick.bind(this, record, index),
                                })
                            }
                        }}
                        onCell={(key, record, index) => {

                            if (index === 10 && key === 'name') {
                                return ({
                                    style: { background: '#187', color: '#fff' },
                                })
                            }
                            if (index === 10 && key === 'age') {
                                return ({
                                    style: { background: '#f60', color: '#fff' },
                                })
                            }
                        }}
                    />
                </div>
            </div>
        )
    };
};

export default CustomTable