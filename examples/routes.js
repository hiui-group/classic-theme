import Home from './pages/Home'
import About from './pages/About'

import {Mix3, Mi8, Mi6, TV4A, TV4S, PhoneStatistics, TVStatistics} from './pages/Products'
import SiderLayout from '../src/components/SiderLayout'
// 没有顶部一级导航时
// const routeConfig = {
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
const routeConfig = {
  hasTopNav: true,
  routes: [{
    path: '/',
    component: Home,
    exact: true
  }, {
    path: '/products',
    component: SiderLayout,
    routes: [{
      path: '/mix3',
      component: Mix3
    }, {
      path: '/mi8',
      component: Mi8
    }, {
      path: '/mi6',
      component: Mi6
    }, {
      path: '/tv4a',
      component: TV4A
    }, {
      path: '/tv4s',
      component: TV4S
    }]
  }, {
    path: '/about',
    component: About
  }, {
    path: '/statistics',
    component: SiderLayout,
    routes: [{
      path: '/phone',
      component: PhoneStatistics
    }, {
      path: '/tv',
      component: TVStatistics
    }]
  }]
}
export default routeConfig
