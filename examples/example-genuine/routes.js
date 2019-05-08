import React from 'react'
import siders from './siders'
import Home from './Home'
import { Mix3, Mi8, Mi6, TV4A, TV4S } from '../pages/Products'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import { SiderLayout } from '../../src'
// History.createHashHistory()

const dropDatas = [{
  title: '切换布局',
  value: 'layout'
}, {
  title: '切换颜色',
  value: 'color'
}]

const routes = (extendCallback) => {
  const _extends = <Dropdown list={dropDatas} title='切换配色' onClick={val => {
    extendCallback && extendCallback(val)
  }} />
  return [{
    path: '/',
    render: props => {
      return (
        <SiderLayout
          sider={siders}
          accordion={false}
          extend={_extends}
          routes={
            [{
              path: '/',
              exact: true,
              component: Home
            }, {
              path: '/mix3',
              component: Mix3,
              name: 'test1'
            }, {
              path: '/mi8/:id',
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
          }
          {...props}
        />
      )
    }
  }]
}
export default routes
