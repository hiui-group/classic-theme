import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { NavGroup, Login } from '../../../src'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import './index.scss'
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
      colors: [{ value: 'white', title: '浅色' }, { title: '深色', value: 'black' }],
      color: 'black',
      layouts: [{
        title: '平铺式',
        value: 'flat'
      }, {
        title: '卡片式',
        value: 'card'
      }]
    }
  }
  render () {
    return <React.Fragment>
      <NavGroup position='left'>
        <NavGroup.Item>
          <span className={`${this.state.color === 'black' ? 'custome-dropdown' : ''}`}>
            <Dropdown list={this.state.colors} title='切换配色' onClick={val => {
              this.props.onColorChange(val)
              this.setState({
                color: val
              })
            }} />
          </span>
        </NavGroup.Item>
        <NavGroup.Item>
          <span className={`${this.state.color === 'black' ? 'custome-dropdown' : ''}`}>
            <Dropdown list={this.state.layouts} title='切换布局' onClick={val => {
              this.props.onLayoutChange(val)
            }} />
          </span>
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
