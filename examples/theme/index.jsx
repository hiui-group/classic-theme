import React, { Component } from 'react'
import Theme from '../../src/theme'
import _routeConfig from './routes-config'
import { Input, Icon } from '@hi-ui/hiui'

const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: 'HIUI Theme',
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: 'Mi Guest',
  icon: 'user',
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
const toolbar = [<Input key='1' />, <Icon key='2' name='prompt' />]
const TV = () => <div>小米电视</div>
class App extends Component {
  state = {
    routeConfig: [{ name: '电视', path: '/tv', component: TV }]
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({ routeConfig: _routeConfig })
    }, 5000)
  }
  render () {
    return (
      <Theme
        routes={this.state.routeConfig}
        logo={logoConfig}
        login={loginConfig}
        type='classic'
        toolbar={toolbar}
      />
    )
  }
}

export default App
