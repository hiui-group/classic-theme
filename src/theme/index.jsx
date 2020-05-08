import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../components/Layout'
import Login from '../components/Login'
import Logo from '../components/Logo'
import { transformConfig } from '../util/common'

class Theme extends Component {
  constructor (props) {
    super(props)
    this.hasHistory = false
    this.history = {
      browserHistory: createBrowserHistory,
      hashHistory: createHashHistory
    }
  }
  render () {
    const {
      historyType = 'browserHistory',
      basename = '/',
      routes = [],
      type = 'classic',
      apperance = { color: 'dark' },
      logo,
      login,
      header,
      toolbar,
      siderTopRender,
      siderBottomRender,
      accordion = true,
      fallback,
      footer
    } = this.props
    const Layout = layout[type]
    if (!this.hasHistory) {
      this.hasHistory = this.history[historyType]({ basename })
    }
    return (
      <Router history={this.hasHistory}>
        <Route
          path='/'
          render={(props) => (
            <Layout
              menu={transformConfig(routes)}
              siderTopRender={siderTopRender}
              siderBottomRender={siderBottomRender}
              toolbar={toolbar}
              footer={footer}
              type={type}
              apperance={apperance}
              logo={logo && <Logo {...logo} />}
              login={login && <Login {...login} />}
              header={header}
              accordion={accordion}
              fallback={fallback}
              {...props}
            />
          )}
        />
      </Router>
    )
  }
}

export default Theme
