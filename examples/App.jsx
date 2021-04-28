import React, { Component } from 'react'
import './App.scss'
import Theme from './theme'
import { ThemeContext } from '@hi-ui/hiui/es/context'
class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value="hiui-blue">
        <Theme />
      </ThemeContext.Provider>
    )
  }
}

export default App
