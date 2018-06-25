import React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible
        }

        const doc = window.document;
        this.node = doc.createElement('div');
        this.node.style.position = 'absolute';
        this.node.style.top = '0';
        doc.body.appendChild(this.node);
    }

    componentDidMount() {
        this.setOriginPosition();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            })
        }
    }

    componentDidUpdate() {
        this.setOriginPosition();
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }

    setOriginPosition() {
        const { mousePosition } = this.props;
        if (mousePosition) {
            if (this.dialog) {
                const transformOrigin = `${mousePosition.x - this.dialog.offsetLeft}px ${mousePosition.y - this.dialog.offsetTop}px`;
                this.dialog.style.transformOrigin = transformOrigin;
            }
        }
    }

    handleClosed(e) {
        e.stopPropagation();
        this.setState({
            visible: false
        });

        this.props.onClose(e);
    }

    render() {
        const icon_cls = classNames({
            ['close-icon']: true,
            ['hidden']: !this.props.showCloseIcon
        });

        const mask_cls = classNames({
            ['lyj-mobile-dialog-mask']: true,
            ['hidden']: !this.props.mask,
            ['zoom-in']: this.state.visible,
            ['zoom-out']: !this.state.visible,
        });

        const dialog_cls = classNames({
            ['lyj-mobile-dialog']: true,
            ['zoom-in']: this.state.visible,
            ['zoom-out']: !this.state.visible,
        });

        const mask = <div key='mask' className={mask_cls} />;

        const wrap = (
            <div key='wrap' className={`${this.props.prefixCls}-wrap`} onClick={this.props.maskClosable ? this.handleClosed.bind(this) : null}>
                <div ref={element => this.dialog = element} style={this.props.style} className={dialog_cls} onClick={(e) => e.stopPropagation()} >
                    <div className={icon_cls} onClick={this.handleClosed.bind(this)} >
                        <span className="lines line-1" />
                        <span className="lines line-2" />
                    </div>
                    {this.props.children}
                </div>
            </div>);

        const content = [
            mask, wrap
        ];

        if (!this.state.visible) {
            setTimeout(() => {
                this.node.style.display = 'none';
            }, 300); // 与css的一致
        } else {
            this.node.style.display = 'block';
        }

        return (
            createPortal(
                content, //塞进传送门的组件
                this.node
            )
        );
    };
};

Dialog.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    mask: PropTypes.bool,
    showCloseIcon: PropTypes.bool,
    maskClosable: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

Dialog.defaultProps = {
    prefixCls: 'lyj-mobile-dialog',
    style: {},
    mask: true,
    showCloseIcon: true,
    maskClosable: true,
    visible: false,
    onClose: () => { }
}

export default Dialog