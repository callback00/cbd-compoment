import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// import FormComponents from '../components/webForm/FormComponents'

import tablesExample from '../examples/tables/index'

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
                </Switch>
            </div>
        )
    }
}

CustRoutes = withRouter(CustRoutes)

export default CustRoutes
