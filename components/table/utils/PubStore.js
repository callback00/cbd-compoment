
/* start
用于存储公共资源的类
end */

class pubStore {
    constructor(props) {
        this.fixedHeaderRowHeightArry = [];
        this.fixedTbodyRowHeightArry = [];

        this.props = props
    }

    setFixedHeaderRowHeightArry(rowIndex, height) {
        this.fixedHeaderRowHeightArry[rowIndex] = height
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

    handleColumnsSize(thIndex, newColWidth) {
        this.props.handleColumnsSize(thIndex, newColWidth)
    }
}

export default function createPubStore(props) {
    return new pubStore(props)
}