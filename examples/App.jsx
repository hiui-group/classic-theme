import React, { Component } from 'react'
import './App.scss'
import Theme from './theme'
import Provider, { ThemeContext } from '@hi-ui/hiui/es/context'
class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value="orange">
        <Theme />
      </ThemeContext.Provider>
    )
  }
}

export default App
