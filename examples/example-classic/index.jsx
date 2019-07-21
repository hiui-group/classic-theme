import React, { Component } from 'react'
import routeConfig from './routes-config'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './index.scss'
import Layout from '../../src/components/Layout'
const _history = createBrowserHistory()
class App extends Component {
  render () {
    return (
      <Router history={_history}>
        <Route
          path='/'
          component={props => <Layout menu={routeConfig} {...props} />}
        />
      </Router>
    )
  }
}

export default App
