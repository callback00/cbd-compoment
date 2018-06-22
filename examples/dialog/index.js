import React from 'react'

import { Dialog } from '../../components/components'

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true,
        }
    }

    render() {
        return (
            <div>
                <div onClick={() => this.setState({ visible: true })} >显示弹出窗</div>
                <div onClick={() => this.setState({ visible: false })}>关闭弹出窗</div>
                <Dialog visible={this.state.visible} mask={true} maskClosable={false} showCloseIcon={true} >
                    <div style={{ height: '200px', width: '300px' }} >
                        测试
                    </div>
                </Dialog>
            </div>
        );
    };
};

export default Index