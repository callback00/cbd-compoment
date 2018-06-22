import React from 'react'

import { Table } from '../../components/components'

const Column = Table.Column

class FixedTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: 'left',
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
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                width: 60,
                fixed: 'right',
            }
        ]

        let data = [
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
            },
            {
                id: '6',
                name: 'taitan',
                age: '15',
                street: '竹溪',
                building: '航洋',
                number: '',
                companyAddress: 'C栋3楼',
                companyName: '',
                gender: '男'
            }
        ]

        for (let i = 0; i < 3; i++) {
            data.push(...data)
        }

        return (
            <div>
                <div style={{ padding: '0 20px', marginBottom: '15px' }} >
                    <Table
                        columns={columns}
                        data={data}
                        scroll={{ x: '120%', y: 300 }}
                    />
                </div>
            </div>
        )
    };
};

export default FixedTable