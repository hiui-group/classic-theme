import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { NavGroup, Login } from '../../src'
const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
  ]
}
export default class NavHeader extends Component {
  constructor () {
    super()
    this.state = {
      colors: [{id: 'white', title: '白色'}, {title: '黑色'}],
      layouts: [{
        title: '经典布局'
      }, {
        title: '左右双栏布局'
      }]
    }
  }
  render () {
    return <React.Fragment>
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
  }
}

const NoNavHeader = () => {
  return <React.Fragment>
    <NavGroup position='left'>
      <NavGroup.Item>
        <a href='javascript: void(0)'>功能模块</a>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='center'>
      <NavGroup.Item>
        <a>功能模块</a>
      </NavGroup.Item>
      <NavGroup.Item>
        <a>功能模块</a>
      </NavGroup.Item>
      <NavGroup.Item>
        <a>功能模块</a>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='right'>
      <a>功能模块</a>
    </NavGroup>
  </React.Fragment>
}
export {NoNavHeader}
