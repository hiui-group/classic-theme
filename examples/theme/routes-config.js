import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Icon } from '@hi-ui/hiui'
import KeepAliveTest from './KeepAliveTest'
import Page2 from './page2'
// import LazyComponent from './LazyComponent'

const CC = () => (
  <div>
    小米CC
    <div style={{ width: 1100 }} />
  </div>
)

const RedMi = (props) => {
  useEffect(() => {
    console.log('Mounted', props)
  }, [])
  return <div onClick={() => props.history.push('/test-KeepAliveTest')}>红米手机</div>
}

const BlackShark = (props) => {
  return <div>黑鲨手机</div>
}
// const TV = () => <div>小米电视</div>
const SoundBox = () => (
  <div>
    小米音响<Link to="/robot-detail/1">去详情页1</Link>
    小米音响<Link to="/robot-detail/2">去详情页2</Link>
    小米音响<Link to="/robot-detail/3">去详情页3</Link>
  </div>
)
const Robot = () => <div>米家扫地机器人</div>
const Fallback = () => <div>404</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>
const Iot = () => <div>iot</div>
const XiaoAi = () => <div>xiaoai</div>

// const KeepAlivePage = withKeepAlive(Page, { cacheId: 'page' })
// const KeepAlivePage2 = withKeepAlive(Page2, { cacheId: 'page2' })
const LazyCom = React.lazy(() => import('./LazyComponent'))

const config = [
  {
    name: <span>首页</span>,
    path: '/home',
    authority: [1],
    component: Iot,
    // icon: <Icon name="info-circle" />,
    children: [
      {
        name: '工作台',
        path: '/workbench',
        icon: 'file-exe',
        component: SoundBox,
        keepAlive: true,
        // authority: ['admain'],
        children: [
          {
            name: 'Dashboard',
            path: '/dashboard',
            component: XiaoAi,
            authority: [3]
          }
        ]
      },
      {
        name: '详情页',
        path: '/detail',
        component: Robot,
        authority: [1, 2]
      },
      {
        path: '/robot-detail/:id',
        name: '隐藏详情页',
        hideInMenu: true,
        component: RobotDetail
      },
      {
        name: '懒加载页面',
        path: '/lazy-test',
        icon: 'file-exe',
        component: LazyCom,
        // component: LazyComponent,
        keepAlive: true
      }
    ]
  },
  {
    name: 'KeepAlive',
    path: '/test-KeepAliveTest',
    keepAlive: true,
    unmountOnTagClose: true,
    component: KeepAliveTest
  },
  {
    name: '电脑',
    path: '/test-popper2',
    component: Page2
  },
  {
    name: '手机',
    icon: <span>👿</span>,
    children: [
      {
        name: '小米',
        icon: <span>🐂</span>,
        children: [{ name: '小米CC', path: '/cc', component: CC }]
      },
      { name: '红米', path: '/red-mi', component: RedMi, withoutLayout: true },
      {
        name: '黑鲨',
        path: '/black-shark',
        component: BlackShark,
        extraData: { abc: 1 }
      }
    ]
  },
  {
    path: '/404',
    component: Fallback
  }
  // { name: '电视', path: '/tv', component: TV },
]

export default config
