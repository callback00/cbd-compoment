import React from 'react';
import classNames from 'classnames';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.mousePosition = null;
    }

    componentDidMount() {
        this.disposeBG(false);
    }

    handleOpen() {
        this.triggerBarTopEl.className = classNames({
            ['menu-trigger-bar top']: true,
            ['hidden']: true
        });
        this.triggerBarMiddleEl.className = classNames({
            ['menu-trigger-bar middle']: true,
            ['hidden']: true
        });
        this.triggerBarBottomEl.className = classNames({
            ['menu-trigger-bar bottom']: true,
            ['hidden']: true
        });

        this.triggerMenu.className = classNames({
            ['menu-trigger']: true,
            ['hidden']: true
        });

        this.triggerCloseEl.className = classNames({
            ['close-trigger']: true,
            ['show']: true
        });

        this.closeTriggerLeftEl.className = classNames({
            ['close-trigger-bar left']: true,
            ['show']: true
        });

        this.closeTriggerRightEl.className = classNames({
            ['close-trigger-bar right']: true,
            ['show']: true
        });

        this.innerContainerEl.className = classNames({
            ['inner-menu-content']: true,
            ['show']: true
        });

        this.outContainerEl.className = classNames({
            ['out-menu-content']: true,
            ['show']: false
        });

        this.disposeBG(true)
    }

    handleClose() {

        this.closeTriggerLeftEl.className = classNames({
            ['close-trigger-bar left']: true,
        });

        this.closeTriggerRightEl.className = classNames({
            ['close-trigger-bar right']: true,
        });

        this.triggerCloseEl.className = classNames({
            ['close-trigger']: true,
            ['show']: false
        });

        this.triggerMenu.className = classNames({
            ['menu-trigger']: true,
            ['hidden']: false
        });

        this.triggerBarTopEl.className = classNames({
            ['menu-trigger-bar top']: true,
            ['show']: true
        });
        this.triggerBarMiddleEl.className = classNames({
            ['menu-trigger-bar middle']: true,
            ['show']: true
        });
        this.triggerBarBottomEl.className = classNames({
            ['menu-trigger-bar bottom']: true,
            ['show']: true
        });

        this.innerContainerEl.className = classNames({
            ['inner-menu-content']: true,
            ['show']: false
        });

        this.outContainerEl.className = classNames({
            ['out-menu-content']: true,
            ['show']: true
        });

        this.disposeBG(false)

    }

    disposeBG(openFlag) {

        if (openFlag) {
            const openLeafBackground = this.props.openLeafBackground
            this.bgTopEl.style.backgroundColor = openLeafBackground ? openLeafBackground : 'rgb(255, 255, 255)'
            this.bgMiddleEl.style.backgroundColor = openLeafBackground ? openLeafBackground : 'rgb(255, 255, 255)'
            this.bgBottompEl.style.backgroundColor = openLeafBackground ? openLeafBackground : 'rgb(255, 255, 255)'
        } else {
            const closeLeafBackground = this.props.closeLeafBackground
            this.bgTopEl.style.backgroundColor = closeLeafBackground ? closeLeafBackground : 'rgb(98, 149, 202)'
            this.bgMiddleEl.style.backgroundColor = closeLeafBackground ? closeLeafBackground : 'rgb(98, 149, 202)'
            this.bgBottompEl.style.backgroundColor = closeLeafBackground ? closeLeafBackground : 'rgb(98, 149, 202)'
        }

        const height = window.innerHeight;
        const width = window.innerWidth;

        const c = Math.sqrt(height * height + width * width)

        const menuScreenHeight = `${c / 3 * 1.05}px`;
        const menuScreenWidth = `${c * 1.5}px`;

        this.bgTopEl.className = classNames({
            ['menu-bg top']: true,
            ['open']: openFlag
        });
        this.bgTopEl.style.height = menuScreenHeight
        this.bgTopEl.style.width = menuScreenWidth

        this.bgMiddleEl.className = classNames({
            ['menu-bg middle']: true,
            ['open']: openFlag
        });
        this.bgMiddleEl.style.height = openFlag ? menuScreenHeight : 0
        this.bgMiddleEl.style.width = menuScreenWidth

        this.bgBottompEl.className = classNames({
            ['menu-bg bottom']: true,
            ['open']: openFlag
        });
        this.bgBottompEl.style.height = menuScreenHeight
        this.bgBottompEl.style.width = menuScreenWidth
    }

    render() {

        const outBackgroundColor = this.props.outBackgroundColor;
        const style = { backgroundColor: outBackgroundColor };

        const innerBackgroundColor = this.props.innerBackgroundColor;
        const innerStyle = { backgroundColor: innerBackgroundColor };
        return (
            <div className="container" style={style}>

                <div ref={element => { this.triggerMenu = element }} className="menu-trigger" onClick={this.handleOpen.bind(this)} >
                    <span ref={element => { this.triggerBarTopEl = element }} className="menu-trigger-bar top"></span>
                    <span ref={element => { this.triggerBarMiddleEl = element }} className="menu-trigger-bar middle"></span>
                    <span ref={element => { this.triggerBarBottomEl = element }} className="menu-trigger-bar bottom"></span>
                </div>

                <div ref={element => { this.triggerCloseEl = element }} onClick={this.handleClose.bind(this)} className="close-trigger">
                    <span ref={element => { this.closeTriggerLeftEl = element }} className="close-trigger-bar left"></span>
                    <span ref={element => { this.closeTriggerRightEl = element }} className="close-trigger-bar right"></span>
                </div>

                <div className="out-container" >
                    <div ref={element => this.outContainerEl = element} className="out-menu-content show" >
                        {this.props.outContainer}
                    </div>
                </div>

                <div className="inner-container">

                    <span ref={element => this.bgTopEl = element} className="menu-bg top"></span>
                    <span ref={element => this.bgMiddleEl = element} className="menu-bg middle"></span>
                    <span ref={element => this.bgBottompEl = element} className="menu-bg bottom"></span>

                    <div ref={element => this.innerContainerEl = element} className="inner-menu-content" style={innerStyle}>
                        {this.props.innerContainer}
                    </div>
                </div>
            </div>
        );
    };
};

Menu.defaultProps = {
    onClose: () => { },
    outBackgroundColor: '#222',
    innerBackgroundColor: 'white',
    openLeafBackground: 'rgb(255, 255, 255)',
    closeLeafBackground: 'rgb(98, 149, 202)'
}

export default Menu