import React, { Component } from 'react'
import Theme from '../../src/theme' // , { history }
// import _routeConfig from './routes-config'
import _routeConfig from './routes-config-v4'
import { Input } from '@hi-ui/hiui'
import { UserOutlined } from '@hi-ui/icons'

const TV = () => <div>小米电视</div>

const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/logo.png?241e0618fe55d933c280e38954edea05',
  name: <span>HIUI Theme</span>,
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: 'Mi Guest',
  icon: <UserOutlined />,
  children: [
    <div key="1" style={{ textAlign: 'center', margin: '4px 0', width: 100 }}>
      <a href="#info">个人信息</a>
    </div>,
    <div key="2" style={{ textAlign: 'center', margin: '4px 0', width: 100 }}>
      <a href="#logout">注销</a>
    </div>
  ]
}
// eslint-disable-next-line no-unused-vars
const toolbar = [
  <Input key="1" style={{ width: 200 }} />
  // <Select
  //   key="3"
  //   clearable={false}
  //   style={{ width: 200, marginLeft: 8 }}
  //   onChange={() => {
  //     history.browserHistory.push('/cc')
  //   }}
  //   data={[
  //     { title: '电视', id: '3', disabled: true },
  //     { title: '手机', id: '2' },
  //     { title: '笔记本', id: '4', disabled: true },
  //     { title: '生活周边', id: '5' },
  //     { title: '办公', id: '6' }
  //   ]}
  // />
]

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
      <React.Suspense fallback={<div>loading</div>}>
        <Theme
          // routes={this.state.routeConfig}
          routes={_routeConfig}
          logo={logoConfig}
          // siderTopRender={(mini) => (mini ? <div>X</div> : <div>XData</div>)}
          login={loginConfig}
          // type="classic"
          // header={null}
          // theme={'orange'}
          authority={[1, 2, 3]}
          // fallback="/404"
          type="genuine"
          // historyType="browserHistory"
          // type="classic"
          historyType="hashHistory"
          // tagsView
          // tagsViewExtra={<div style={{ padding: '0 1em' }}>extra content</div>}
          apperance={{ color: 'light' }}
          // apperance={{ contentBackground: '#fff', contentPadding: 0 }}
          // accordion={false}
          toolbar={<div>{toolbar}</div>}
          // toolbar={
          //   <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          //     <SettingOutlined key={1} />
          //     <BellOutlined key={2} />
          //   </div>
          // }
          onMenuClick={(item) => {
            console.log('item', item)
          }}
          fallback={'/iot'}
          // viewSize="small"
          // basename={'basename'}
          // disabledAutoFallback
        />
      </React.Suspense>
    )
  }
}

export default App
