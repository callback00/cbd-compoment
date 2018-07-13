import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import tablesExample from '../examples/tables/index'
import mDialog from '../examples/dialog/index'
import menu from '../examples/menu/index'
import background from '../examples/zother/background'

class CustRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/tablesExample" component={tablesExample} routeComponent={this} />
                    <Route path="/mDialog" component={mDialog} routeComponent={this} />
                    <Route path="/menu" component={menu} routeComponent={this} />
                    <Route path="/background" component={background} routeComponent={this} />
                </Switch>
            </div>
        )
    }
}

CustRoutes = withRouter(CustRoutes)

export default CustRoutes
