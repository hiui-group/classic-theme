import React, { Component } from 'react'
import { Logo, Genuine as Page } from '../../src'
import routes from './routes'
import './index.scss'

const logo = <Logo
  url='https://xiaomi.github.io/hiui/#/'
  logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  text='HIUI Demo'
  title='HIUI Classic Theme Demo'
  alt='Project Logo'
/>

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'card',
      color: 'black'
    }
  }

  render () {
    const {
      color,
      type
    } = this.state
    return (
      <Page
        logo={logo}
        routes={routes}
        config={{
          color,
          type
        }}
      />
    )
  }
}

export default App
