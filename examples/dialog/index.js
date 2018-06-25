import React from 'react'

import { Dialog } from '../../components/components'

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        })
    }

    render() {
        const dialogProps = { visible: this.state.visible, mask: true, maskClosable: false, showCloseIcon: true, mousePosition: {} }

        if (this.openItem) {
            dialogProps.mousePosition = { x: this.openItem.offsetLeft, y: this.openItem.offsetTop }
        } else {
            delete dialogProps.mousePosition
        }

        return (
            <div>
                <div ref={(item) => { this.openItem = item }} onClick={() => this.setState({ visible: true })} >显示弹出窗</div>
                <div onClick={() => this.setState({ visible: false })}>关闭弹出窗</div>
                <Dialog {...dialogProps} >
                    <div style={{ height: '200px', width: '300px' }} >
                        测试
                    </div>
                </Dialog>
            </div>
        );
    };
};

export default Index