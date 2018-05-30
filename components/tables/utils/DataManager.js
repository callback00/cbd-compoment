import {warningOnce} from './UtilTools'
class DataManager {

    constructor(data) {
        this.data = data
    }

    // 重新构建可自动合并相同单元格的数据。
    groupedData(columns, autoMergeCell) {

        const mergeData = []
        // 重新构造数据并添加到mergeData中
        this.data.forEach(rowItem => {
            const newItem = {}

            for (const key in rowItem) {
                if (columns.filter((tempColumn) => { return tempColumn.dataIndex === key }).length > 0) {
                    newItem[key] = { key, value: rowItem[key], rowSpan: 1, visible: true, isDataColumn: true }
                } else {
                    // columns中不存在key不渲染
                    newItem[key] = { key, value: rowItem[key], rowSpan: 1, visible: false, isDataColumn: true }
                }
            }

            columns.forEach((columnItem) => {
                {
                    if (!(columnItem.dataIndex in rowItem)) {
                        // 处理自定义的列，即columns 中的属性在data中不存的情况。
                        // 注意，如果autoMergeCell则不显示 自定义列
                        // 自定义列没有dataIndex，所以取key
                        newItem[columnItem.key] = { key: columnItem.key, value: columnItem.render, rowSpan: 1, visible: true, isDataColumn: false }

                        warningOnce(`非数据列(${columnItem.key || columnItem.title})不会自动合并。`);
                    }
                }
            })

            newItem.orgRecord = { ...rowItem }

            mergeData.push(newItem)
        });

        // 用闭包来写
        const MergeCell = function (key, startRowIndex = 0, nextRowIndex = 1) {
            if (nextRowIndex > mergeData.length - 1) {
                return
            }

            //程序是自左向右合并,如果第一列不同不合并
            // firstKey是外层函数的变量

            if (mergeData[startRowIndex][key].isDataColumn // 是否是数据列
                && mergeData[startRowIndex][key].value === mergeData[nextRowIndex][key].value //上下单元格的值是否相同
                && mergeData[startRowIndex][firstKey].value === mergeData[nextRowIndex][firstKey].value) { //只有第一列相同的数据才合并

                mergeData[startRowIndex][key].rowSpan += 1

                mergeData[nextRowIndex][key].visible = false

                MergeCell(key, startRowIndex, nextRowIndex + 1)
            } else {
                startRowIndex = nextRowIndex
                nextRowIndex += 1

                MergeCell(key, startRowIndex, nextRowIndex)
            }
        }

        // 如果不需要合并数据，则直接返回
        if (!autoMergeCell) {
            return mergeData
        }

        let firstKey = ''
        for (let i = 0; i < columns.length; i++) {
            if (firstKey === '') {
                firstKey = columns[0].key
            }
            // 此处重新修改mergeData的rowSpan
            MergeCell(columns[i].key)
        }

        return mergeData

    }
}

export default DataManager