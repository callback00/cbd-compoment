import React from 'react';


function genderOnClick(e) {
    console.log('自定义控件事件触发')
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 50
            },
            {
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 200
                    },
                    {
                        title: 'Block',
                        children: [
                            {
                                title: 'Building',
                                dataIndex: 'building',
                                key: 'building',
                                width: 100
                            },
                            {
                                title: 'Door No.',
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
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress'
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName'
            }
        ]
    },
    {
        title: (
            <a href='#' onClick={genderOnClick} >
                Gender
            </a>
        ),
        dataIndex: 'gender',
        key: 'gender',
        width: 60
    },
    {
        title: 'Operations',
        dataIndex: '',
        key: '1',
        width: 60,
        render() {
            return <a href="#">Operations</a>;
        },
    },
    {
        title: '测试自定义render',
        dataIndex: '',
        key: '2',
        // width: 60,
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
        gender: '男'
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

export default { data, columns }