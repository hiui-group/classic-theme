import React, { Component } from 'react'
import './App.scss'
import DefaultTheme from './example-classic'
import GenuineTheme from './example-genuine'
class App extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      layout: 'default'
    }
  }

  render () {
    return (
      <DefaultTheme />
      // <GenuineTheme />
    )
  }
}

export default App
