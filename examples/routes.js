import React from 'react'
import siders from './siders'
import Home from './pages/Home'
import About from './pages/About'

import {Mix3, Mi8, Mi6, TV4A, TV4S, PhoneStatistics, TVStatistics} from './pages/Products'
import SiderLayout from '../src/components/SiderLayout'
import { Login } from '../src'
// History.createHashHistory()

const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
  ]
}
// 没有顶部一级导航时
// const routes = {
//   routes: [
//     {
//       path: '/',
//       exact: true,
//       component: Home
//     }, {
//       path: '/products/mix3',
//       component: Mix3
//     }, {
//       path: '/products/mi8',
//       component: Mi8
//     }, {
//       path: '/products/mi6',
//       component: Mi6
//     }, {
//       path: '/products/tv4a',
//       component: TV4A
//     }, {
//       path: '/products/tv4s',
//       component: TV4S
//     }
//   ]
// }
// 使用顶部一级导航时
const routes = [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/products',
  render: props => {
    return (
      <SiderLayout
        sider={siders.products}
        extend={<Login {...login} />}
        routes={
          [{
            path: '/products/mix3',
            component: Mix3,
            name: 'test1'
          }, {
            path: '/products/mi8/:id',
            component: Mi8
          }, {
            path: '/products/mi6',
            component: Mi6
          }, {
            path: '/products/tv4a',
            component: TV4A
          }, {
            path: '/products/tv4s',
            component: TV4S
          }]
        }
        {...props}
      />
    )
  }
}, {
  path: '/about',
  component: About
}, {
  path: '/statistics',
  render: props => {
    return (
      <SiderLayout
        sider={siders.statistics}
        routes={
          [{
            path: '/statistics/phone',
            component: PhoneStatistics
          }, {
            path: '/statistics/tv',
            component: TVStatistics
          }]
        }
        {...props}
      />
    )
  }
}
]
export default routes
