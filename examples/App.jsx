import React, { Component } from 'react'
import './App.scss'
import Theme from './theme'

class App extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      layout: 'default'
    }
  }

  render () {
    return <Theme />
  }
}

export default App
