import React, { Component } from 'react'
import Theme from '../../src/theme-new'
import routeConfig from './routes-config'

class App extends Component {
  render () {
    return <Theme routes={routeConfig} />
  }
}

export default App
