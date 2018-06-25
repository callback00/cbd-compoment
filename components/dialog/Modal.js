import React from 'react';
import Dialog from './Dialog';

let mousePositionEventBinded = false;

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.mousePosition = null;
    }

    componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        document.documentElement.addEventListener('click', this.getClickPosition);

        mousePositionEventBinded = true;
    }

    componentWillUnmount() {
        document.documentElement.removeEventListener("click", this.getClickPosition);
    }

    getClickPosition(e) {
        this.mousePosition = {
            x: e.pageX,
            y: e.pageY,
        };
        // 100ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开
        setTimeout(() => this.mousePosition = null, 100);
    }

    render() {

        const dialogProps = { ...this.props };

        if (this.mousePosition) {
            dialogProps.mousePosition = this.mousePosition;
        }

        if (this.props.visible || this.dialog) {
            return (
                <Dialog ref={item => this.dialog = item} {...dialogProps} />
            );
        }

        return null;
    };
};

Modal.defaultProps = {
    onClose: () => { }
}

export default Modal