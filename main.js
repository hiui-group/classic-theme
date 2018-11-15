import React from 'react'
import { render } from 'react-dom'
import App from './App'
import {ThemeContext} from '@hi-ui/hiui'
render(
  <ThemeContext.Provider value='orange'>
    <App />
  </ThemeContext.Provider>,
  document.getElementById('app')
)
