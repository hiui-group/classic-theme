import React, { Component } from 'react'
import { Logo, Classic } from '../../src'
import routeConfig from './routes-config'
import Header from './Header'
import './index.scss'
import Layout from '../../src/components/Layout'

class App extends Component {
  render () {
    return <Layout menu={routeConfig} />
  }
}

export default App
