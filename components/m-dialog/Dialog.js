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
        this.node.style.position = 'absolute'
        this.node.style.top = '0'
        doc.body.appendChild(this.node);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            })
        }
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }

    handleClosed(e) {
        this.setState({
            visible: false
        })
    }

    render() {
        const icon_cls = classNames({
            ['close-icon']: true,
            ['hidden']: !this.props.showCloseIcon
        });

        const mask_cls = classNames({
            ['cbd-mobile-dialog-mask']: true,
            ['hidden']: !this.props.mask
        });

        const mask = <div key='mask' className={mask_cls} />;

        const wrap = (
            <div key='wrap' className="cbd-mobile-dialog-wrap" onClick={this.props.maskClosable ? this.handleClosed.bind(this) : null}>
                <div style={this.props.style} className="cbd-mobile-dialog" onClick={(e) => e.stopPropagation()} >
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

        this.node.style.display = this.state.visible ? 'block' : 'none';

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
    onClose: PropTypes.func
}

Dialog.defaultProps = {
    prefixCls: 'cbd-mobile-dialog',
    style: {},
    mask: true,
    showCloseIcon: true,
    maskClosable: true,
    visible: false,
    onClose: () => { }
}

export default Dialog