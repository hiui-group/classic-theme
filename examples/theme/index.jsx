import React, { Component } from 'react'
import Theme, { history } from '../../src/theme'
import _routeConfig from './routes-config'
import { Input, Icon, Select } from '@hi-ui/hiui'

// const KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home' })
// const KeepAliveUserList = withKeepAlive(UserList, { cacheId: 'UserList', scroll: true })
// const KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' })

const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: <span>HIUI Theme</span>,
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: 'Mi Guest',
  icon: 'user',
  children: [
    <div key="1" style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href="#info">个人信息</a>
    </div>,
    <div key="2" style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href="#logout">注销</a>
    </div>
  ]
}
// eslint-disable-next-line no-unused-vars
const toolbar = [
  <Input key="1" style={{ width: 200 }} />,
  <Icon key="2" name="prompt" />,
  <Select
    key="3"
    type="single"
    clearable={false}
    style={{ width: 200 }}
    onChange={() => {
      history.browserHistory.push('/cc')
    }}
    data={[
      { title: '电视', id: '3', disabled: true },
      { title: '手机', id: '2' },
      { title: '笔记本', id: '4', disabled: true },
      { title: '生活周边', id: '5' },
      { title: '办公', id: '6' }
    ]}
  />
]
const toolbar2 = (
  <div style={{ flex: 1 }}>
    <Input key="1" style={{ width: 200 }} />
    <Icon key="2" name="prompt" />
    <Select
      type="single"
      clearable={false}
      style={{ width: 200 }}
      onChange={() => {
        console.log('>>>>>', history)
        history.browserHistory.push('/cc')
      }}
      data={[
        { title: '电视', id: '3', disabled: true },
        { title: '手机', id: '2' },
        { title: '笔记本', id: '4', disabled: true },
        { title: '生活周边', id: '5' },
        { title: '办公', id: '6' }
      ]}
    />
  </div>
)

const TV = () => <div>小米电视</div>
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeConfig: [{ name: '电视', path: '/tv', component: TV }]
    }
  }

  // componentDidMount () {
  //   setTimeout(() => {
  //     this.setState({ routeConfig: _routeConfig })
  //   }, 2000)
  // }
  render() {
    return (
      <Theme
        // routes={this.state.routeConfig}
        routes={_routeConfig}
        logo={logoConfig}
        // siderTopRender={(mini) => (mini ? <div>X</div> : <div>XData</div>)}
        login={loginConfig}
        // type="classic"
        // header={null}
        theme={'orange'}
        authority={['normal']}
        // fallback="/404"
        type="genuine"
        apperance={{ color: 'light' }}
        // apperance={{ contentBackground: '#fff', contentPadding: 0 }}
        accordion={false}
        toolbar={toolbar2}
        onMenuClick={(item) => {
          console.log('item', item)
        }}
      />
    )
  }
}

export default App
