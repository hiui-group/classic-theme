import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Logo, Login, NavGroup, Classic as Page } from '../src'
import { Icon } from '@hi-ui/hiui'
import Home from './pages/Home'
import About from './pages/About'
import Template, { Template2 } from './pages/Template'
import SiderLayout from '../src/components/SiderLayout'
// History.createHashHistory()
// 没有顶部一级导航时
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/template/t1',
    exact: true,
    component: Template
  }, {
    path: '/template/t2',
    exact: true,
    component: Template2
  }, {
    path: '/color/blue',
    exact: true,
    component: About
  }
]
console.log(routes)
// 使用顶部一级导航时
const headerRoutes = [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/template',
  component: SiderLayout,
  routes: [{
    path: '/t2',
    component: Template2
  }, {
    path: '/t1',
    // exact: true,
    component: Template
  }]
}, {
  path: '/about',
  component: About
}, {
  path: '/template1',
  component: SiderLayout,
  name: 'template1',
  routes: [{
    path: '/inner1',
    component: About
  }]
}]

const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
  ]
}

const header = (
  <React.Fragment>
    <NavGroup position='left'>
      <NavGroup.Item>
        <a href='javascript: void(0)'>左侧导航</a>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='center'>
      <NavGroup.Item>
        <Link to='/' replace>首页</Link>
      </NavGroup.Item>
      <NavGroup.Item>
        <Link to='/template' replace>模板</Link>
      </NavGroup.Item>
      <NavGroup.Item>
        <Link to='/about' replace>关于我们</Link>
      </NavGroup.Item>
      <NavGroup.Item>
        <Link to='/template1' replace>模板1</Link>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='right'>
      <NavGroup.Item>
        <Link to='/' replace>主页</Link>
      </NavGroup.Item>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)
const sider = {
  items: [
    {
      title: '模板',
      icon: <Icon name='usergroup' />,
      children: [
        {
          title: '模板一',
          to: '/template/t1'
        },
        {
          title: '模板二',
          to: '/template/t2'
        },
        {
          title: '额外模板',
          type: 'title',
          children: [
            {
              title: '额外模板一',
              to: '/outer/1'
            },
            {
              title: '额外模板二',
              to: '/outer/2'
            },
            {
              title: '额外模板三',
              to: '/outer/3'
            }
          ]
        }
      ]
    },
    {
      title: '配色',
      to: '',
      icon: <Icon name='usergroup' />,
      children: [
        {
          title: '灰色',
          to: '/color/gray'
        },
        {
          title: '蓝色',
          to: '/color/blue'
        }
      ]
    }
  ]
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'flat',
      color: 'blue'
    }
  }
  render () {
    const logo = <Logo
      url='https://xiaomi.github.io/hiui/#/'
      logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
      text='HIUI Demo'
      title='HIUI Classic Theme Demo'
      alt='Project Logo'
    />
    return (
      <Page
        header={header}
        logo={logo}
        // routes={routes}
        topNav
        routes={headerRoutes}
        sider={sider}
        config={{
          color: 'blue',
          type: 'flat',
          theme: 'cyan'
        }}
      />
    )
  }
}

export default App
