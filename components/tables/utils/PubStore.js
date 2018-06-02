
/* start
用于存储公共资源的类
end */

class pubStore {
    constructor(props) {
        this.fixedHeaderRowHeightArry = [];
        this.fixedTbodyRowHeightArry = [];
    }

    setFixedHeaderRowHeightArry(rowIndex, height) {
        this.fixedHeaderRowHeightArry[rowIndex] = height
        console.log(height)
    }

    getFixedHeaderRowHeightArry() {
        return [...this.fixedHeaderRowHeightArry]
    }


    setFixedTbodyRowHeightArry(rowIndex, height) {
        this.fixedTbodyRowHeightArry[rowIndex] = height
    }


    getFixedTbodyRowHeightArry() {
        return [...this.fixedTbodyRowHeightArry]
    }
}

export default function createPubStore() {
    return new pubStore()
}