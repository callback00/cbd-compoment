import React from 'react';


function genderOnClick(e) {
    console.log('自定义控件事件触发')
}

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: '其他信息',
        children: [
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 50
            },
            {
                title: '地址',
                children: [
                    {
                        title: '街道',
                        dataIndex: 'street',
                        key: 'street',
                        width: 200
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
                                width: 100
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
            <a href='#' onClick={genderOnClick} >
                性别
            </a>
        ),
        dataIndex: 'gender',
        key: 'gender',
        width: 60
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
        render(text, row, index) {
            return (
                <input style={{ width: '100%', boxSizing: 'border-box' }} />
            );
        },
    }
]

const data = [
    {
        id: '1',
        name: 'daily',
        age: '28',
        street: '五一路',
        building: '维也纳酒店',
        number: '101',
        companyAddress: '五一路淡村市场',
        companyName: '了一家科技公司',
        gender: {}
    },
    {
        id: '2',
        name: 'daily',
        age: '28',
        street: '五二路',
        building: '维也纳酒店',
        number: '101',
        companyAddress: '五一路淡村市场',
        companyName: '了一家科技公司',
        gender: '男'
    },
    {
        id: '3',
        name: 'daily',
        age: '28',
        street: '五三路',
        building: '维也纳酒店',
        number: '101',
        companyAddress: '五一路淡村市场',
        companyName: '了一家科技公司',
        gender: '女'
    },
    {
        id: '4',
        name: 'lufi',
        age: '28',
        street: '五一路',
        building: '维也纳酒店',
        number: '101',
        companyAddress: '五一路淡村市场',
        companyName: '了一家科技公司',
        gender: '男'
    },
    {
        id: '5',
        name: 'lufi',
        age: '28',
        street: '五二路',
        building: '维也纳酒店',
        number: '101',
        companyAddress: '五一路淡村市场',
        companyName: '了一家科技公司',
        gender: '男'
    }
]

const simpleColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },

    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 50
    },
    {
        title: '街道',
        dataIndex: 'street',
        key: 'street',
        width: 200
    },
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
        width: 100
    },
    {
        title: '公司地址',
        dataIndex: 'companyAddress',
        key: 'companyAddress'
    },
    {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName'
    },
    {
        title: (
            <a href='#' onClick={genderOnClick} >
                性别
            </a>
        ),
        dataIndex: 'gender',
        key: 'gender',
        width: 60
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
        render(text, row, index) {
            return (
                <input style={{ width: '100%', boxSizing: 'border-box' }} />
            );
        },
    }
]

function getLargeData() {
    const largeData = []
    for (let i = 0; i < 10; i++) {
        largeData.push(...data);
    }

    return largeData;
}

export default { data, columns, simpleColumns, getLargeData }