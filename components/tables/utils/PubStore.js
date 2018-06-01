
import lodash from 'lodash'

class pubStore {
    constructor(props) {
        this.fixedHeaderRowHeightArry = [];
        this.fixedTbodyRowHeightArry = [];
    }

    // 设置固定列各行的行高
    setFixedHeaderRowHeightArry(rowIndex, height) {
        this.fixedHeaderRowHeightArry[rowIndex] = height
        console.log(height)
    }

    // 获取固定列table的行高，它的高度由数据table列的行高决定
    getFixedHeaderRowHeightArry() {
        return [...this.fixedHeaderRowHeightArry]
    }

    // 设置固定列各行的行高
    setFixedTbodyRowHeightArry(rowIndex, height) {
        this.fixedTbodyRowHeightArry[rowIndex] = height
        console.log(height)
    }

    // 获取固定列table的行高，它的高度由数据table列的行高决定
    getFixedTbodyRowHeightArry() {
        return [...this.fixedTbodyRowHeightArry]
    }
}

export default function createPubStore() {
    return new pubStore()
}