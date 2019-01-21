import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo, Login, NavGroup, Classic as Page } from '../src'
import routes from './routes'
// History.createHashHistory()

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
        <a href='javascript: void(0)'>切换站点</a>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='center'>
      <NavGroup.Item>
        <NavLink to='/' exact activeClassName='header__nav-link--active'>首页</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/products/mix3' activeClassName='header__nav-link--active'>产品系列</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/statistics/phone' activeClassName='header__nav-link--active'>统计数据</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/about' activeClassName='header__nav-link--active'>其它</NavLink>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='right'>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)
class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'flat',
      color: 'blue',
      breadcrumb: [
        {
          to: '/products/mix3',
          title: '产品系列'
        },
        {
          title: '红米系列'
        },
        {
          to: '/products/mi6',
          title: '红米6'
        }
      ]
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
    const {
      breadcrumb
    } = this.state

    return (
      <Page
        header={header}
        logo={logo}
        breadcrumb={breadcrumb}
        routes={routes}
        config={{
          color: 'black',
          type: 'flat'
        }}
      />
    )
  }
}

export default App
