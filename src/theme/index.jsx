import React, { Component } from 'react'

import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../../src/components/Layout'
const browserHistory = createBrowserHistory()
const hashHistory = createHashHistory()
const history = { browserHistory, hashHistory }

class Theme extends Component {
  render () {
    const {
      historyType = 'browserHistory',
      routes = [],
      type = 'classic',
      apperance = { color: 'dark', background: 'dark' },
      logo
    } = this.props
    const Layout = layout[type]
    return (
      <Router history={history[historyType]}>
        <Route
          path='/'
          component={props => (
            <Layout menu={routes} type={type} apperance={apperance} logo={logo} {...props} />
          )}
        />
      </Router>
    )
  }
}

export default Theme