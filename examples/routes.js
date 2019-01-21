import React from 'react'
import siders from './siders'
import Home from './pages/Home'
import About from './pages/About'

import {Mix3, Mi8, Mi6, TV4A, TV4S, PhoneStatistics, TVStatistics} from './pages/Products'
import SiderLayout from '../src/components/SiderLayout'
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