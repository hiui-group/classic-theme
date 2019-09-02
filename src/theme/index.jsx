import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../components/Layout'
import Login from '../components/Login'
import Logo from '../components/Logo'
import { transformConfig } from '../util/common'
const browserHistory = createBrowserHistory()
const hashHistory = createHashHistory()
export const history = { browserHistory, hashHistory }

class Theme extends Component {
  render () {
    const {
      historyType = 'browserHistory',
      routes = [],
      type = 'classic',
      apperance = { color: 'dark' },
      logo,
      login,
      header,
      toolbar
    } = this.props
    const Layout = layout[type]
    return (
      <Router history={history[historyType]}>
        <Route
          path='/'
          render={props => (
            <Layout
              menu={transformConfig(routes)}
              toolbar={toolbar}
              type={type}
              apperance={apperance}
              logo={logo && <Logo {...logo} />}
              login={login && <Login {...login} />}
              header={header}
              {...props}
            />
          )}
        />
      </Router>
    )
  }
}

export default Theme
