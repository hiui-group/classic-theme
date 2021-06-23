import React from 'react'
import { Link } from 'react-router-dom'
import KeepAliveTest from './KeepAliveTest'
import Page2 from './page2'

const CC = () => (
  <div>
    小米CC
    <div style={{ width: 1100 }} />
  </div>
)
const RedMi = () => <div>红米手机</div>
const BlackShark = (props) => {
  return <div>黑鲨手机</div>
}
// const TV = () => <div>小米电视</div>
const SoundBox = () => (
  <div>
    小米音响<Link to="/robot-detail/1">去详情页</Link>
  </div>
)
const Robot = () => <div>米家扫地机器人</div>
const Fallback = () => <div>404</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>
const Iot = () => <div>iot</div>
const XiaoAi = () => <div>xiaoai</div>

// const KeepAlivePage = withKeepAlive(Page, { cacheId: 'page' })
// const KeepAlivePage2 = withKeepAlive(Page2, { cacheId: 'page2' })

const config = [
  {
    name: '智能硬件',
    path: '/iot',
    authority: [1],
    component: Iot,
    children: [
      {
        name: '音响',
        path: '/audio',
        component: SoundBox,
        // authority: ['admain'],
        children: [{ name: '小爱', path: '/xiaoai', component: XiaoAi, authority: ['admain'] }]
      },
      { name: '扫地机器人', path: '/robot', component: Robot },
      { path: '/robot-detail/:id', component: RobotDetail }
    ]
  },
  {
    name: '测试KeepAlive',
    path: '/test-KeepAliveTest',
    keepAlive: true,
    component: KeepAliveTest
  },
  {
    name: '测试popper2',
    path: '/test-popper2',
    component: Page2
  },
  {
    name: '手机',
    children: [
      {
        name: '小米',
        children: [{ name: '小米CC', path: '/cc', component: CC }]
      },
      { name: '红米', path: '/red-mi', component: RedMi, withoutLayout: true },
      { name: '黑鲨', path: '/black-shark', component: BlackShark, extraData: { abc: 1 } }
    ]
  },
  {
    path: '/404',
    component: Fallback
  }
  // { name: '电视', path: '/tv', component: TV },
]

export default config
