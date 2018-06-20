import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import tablesExample from '../examples/tables/index'
import mDialog from '../examples/m-dialog/index'

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
                </Switch>
            </div>
        )
    }
}

CustRoutes = withRouter(CustRoutes)

export default CustRoutes
