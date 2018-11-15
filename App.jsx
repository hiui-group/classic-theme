import React, { Component } from 'react'
// import Layout, { Logo, Login } from '@hi-ui/classic-theme'
import Layout, { Logo, Login, NavGroup } from './src'
import { Icon } from '@hi-ui/hiui'
// import Home from './Home'

// const routes = [
//   {
//     path: '/',
//     exact: true,
//     component: Home,
//   }
// ]
const login = {
  name: '我想静静',
  icon: <span className='hi-icon icon-user' />,
  children: [<div key='1' style={{textAlign: 'center', margin: 4, width: '100px'}}>个人信息</div>, <div key='2' style={{textAlign: 'center', margin: 4, width: '100px'}}>注销</div>] // 点击后下拉框显示内容
}

const header = (
  <React.Fragment>
    <NavGroup pos='left'>
      <NavGroup.Item />
      <NavGroup.Item />
      <NavGroup.Item />
    </NavGroup>
    <NavGroup pos='right'>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'inner',
      color: 'blue'
    }
  }
  render () {
    const logo = <Logo
      url='https://xiaomi.github.io/hiui/#/'
      logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
      text='罗汉堂'
      title='罗汉堂'
      alt='Logo'
    />
    return (
      <Layout
        header={header}
        logo={logo}
        // routes={routes}
        sider={{
          items: [
            {key: 1, title: '首页', to: '/', icon: <Icon name='user' />},
            {
              key: 2,
              title: '内嵌',
              to: '',
              icon: <Icon name='usergroup' />,
              children: [
                {key: 21,
                  title: '内嵌',
                  to: {
                    hash: 'inner'
                  }
                },
                {key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                }
              ]
            },
            {
              key: 3,
              title: '配色',
              to: '',
              icon: <Icon name='usergroup' />,
              children: [
                {
                  key: 31,
                  title: '灰色',
                  to: {
                    hash: 'gray'
                  }
                },
                {
                  key: 32,
                  title: '蓝色',
                  to: {
                    hash: 'blue'
                  }
                }
              ]
            }
          ]
        }}
        theme={{
          type: 'inner',
          color: 'dark'
          // type: 'outter',
          // color: 'dark'
        }}
      />
    )
  }
}

export default App
