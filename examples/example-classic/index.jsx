import React, { Component } from 'react'
import Theme from '../../src/theme-new'
import routeConfig from './routes-config'
import { Logo } from '../../src'

const logo = (
  <Logo
    url='https://xiaomi.github.io/hiui/#/'
    logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
    text='HIUI Demo'
    title='HIUI Classic Theme Demo'
    alt='Project Logo'
  />
)
class App extends Component {
  render () {
    return <Theme routes={routeConfig} logo={logo} />
  }
}

export default App
