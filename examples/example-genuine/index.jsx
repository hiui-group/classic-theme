import React, { Component } from 'react'
import { Logo, Genuine as Page, History } from '../../src'
import routes from './routes'
import './index.scss'
// import Img from './menu.png'

History.createHashHistory()
const logo = <Logo
  url='https://xiaomi.github.io/hiui/#/'
  logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  // logoUrl={Img} //另一种图片声明方式
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
  extendCallback (val) {
    const o = {}
    const {type, color} = this.state
    if (val === 'layout') {
      o.type = type === 'card' ? 'flat' : 'card'
    }
    if (val === 'color') {
      o.color = color === 'black' ? 'white' : 'black'
    }
    this.setState(o)
  }
  render () {
    const {
      color,
      type
    } = this.state
    const rs = routes(this.extendCallback.bind(this))
    return (
      <Page
        logo={logo}
        routes={rs}
        config={{
          color,
          type
        }}
      />
    )
  }
}

export default App
