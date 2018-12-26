import Home from './pages/Home'
import About from './pages/About'

import Template, { Template2 } from './pages/Template'
import SiderLayout from '../src/components/SiderLayout'
// 没有顶部一级导航时
// const routeConfig = {
//   routes: [
//     {
//       path: '/',
//       exact: true,
//       component: Home
//     }, {
//       path: '/template/t1',
//       exact: true,
//       component: Template
//     }, {
//       path: '/template/t2',
//       exact: true,
//       component: Template2
//     }, {
//       path: '/color/blue',
//       exact: true,
//       component: About
//     }
//   ]
// }
// 使用顶部一级导航时
const routeConfig = {
  hasTopNav: true,
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/products',
    component: SiderLayout,
    routes: [{path: '/index', component: About}, {
      path: '/t2',
      component: Template2
    }, {
      path: '/t1',
      component: Template
    }]
  }, {
    path: '/about',
    component: About
  }, {
    path: '/template1',
    component: SiderLayout,
    routes: [{
      path: '/inner1',
      component: About
    }]
  }]
}
export default routeConfig
