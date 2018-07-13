import React from 'react'
import { Menu } from '../../components/components'

class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    renderOutContainer() {
        return (
            <span className="logo">
                <span>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                    ⬢
                <p className="logo-title">UI</p>
                    <p className="logo-badge">6</p>
                </span>
            </span>
        )
    }

    renderInnerContainer() {
        return (
            <ul className="menu">
                <li>
                    <a href="#">Login</a>
                </li>
                <li>
                    <a href="#">Create account</a>
                </li>
                <li>
                    <a href="#">Support</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Login</a>
                </li>
                <li>
                    <a href="#">Create account</a>
                </li>
                <li>
                    <a href="#">Support</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>                            <li>
                    <a href="#">Login</a>
                </li>
                <li>
                    <a href="#">Create account</a>
                </li>
                <li>
                    <a href="#">Support</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Login</a>
                </li>
                <li>
                    <a href="#">Create account</a>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100vh' }} >
                <Menu
                    outContainer={this.renderOutContainer()}
                    innerContainer={this.renderInnerContainer()}

                    outBackgroundColor='#3E989B'
                    innerBackgroundColor='yellow'

                    openLeafBackground='black'
                    closeLeafBackground='green'
                />
            </div>
        );
    };
};

export default Index