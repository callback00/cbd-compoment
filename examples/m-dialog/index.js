import React from 'react'
import Dialog from '../../components/m-dialog/Index'

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ visible: true })} >显示弹出窗</button>
                <button onClick={() => this.setState({ visible: false })}>关闭弹出窗</button>
                <Dialog visible={this.state.visible} mask={true} >
                    <div style={{ height: '200px', width: '300px' }} >
                        测试
                    </div>
                </Dialog>
            </div>
        );
    };
};

export default Index