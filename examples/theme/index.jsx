import React, { Component } from 'react'
import Theme from '../../src/theme'
import routeConfig from './routes-config'
import { Logo, Login } from '../../src'

const logo = (
  <Logo
    url='https://xiaomi.github.io/hiui/#/'
    logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
    text='HIUI Demo'
    title='HIUI Classic Theme Demo'
    alt='Project Logo'
  />
)

const loginConfig = {
  name: 'Mi Guest',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
const login = <Login {...loginConfig} />

class App extends Component {
  render () {
    return <Theme routes={routeConfig} logo={logo} login={login} type='genuine' />
  }
}

export default App
