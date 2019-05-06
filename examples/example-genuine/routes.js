import React from 'react'
import siders from './siders'
import Home from './Home'
import { Mix3, Mi8, Mi6, TV4A, TV4S } from '../pages/Products'
import { Login, SiderLayout } from '../../src'
// History.createHashHistory()

const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
  ]
}
const routes = [{
  path: '/',
  render: props => {
    return (
      <SiderLayout
        sider={siders}
        accordion={false}
        extend={<Login {...login} />}
        routes={
          [{
            path: '/genuine/home',
            component: Home
          }, {
            path: '/genuine/mix3',
            component: Mix3,
            name: 'test1'
          }, {
            path: '/genuine/mi8/:id',
            component: Mi8
          }, {
            path: '/genuine/mi6',
            component: Mi6
          }, {
            path: '/genuine/tv4a',
            component: TV4A
          }, {
            path: '/genuine/tv4s',
            component: TV4S
          }]
        }
        {...props}
      />
    )
  }
}
]
export default routes
