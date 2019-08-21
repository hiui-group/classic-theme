import React from 'react'
import { Link } from 'react-router-dom'

const CC = () => <div>小米CC</div>
const RedMi = () => <div>红米手机</div>
const BlackShark = props => {
  return <div>黑鲨手机</div>
}
const TV = () => <div>小米电视</div>
const SoundBox = () => (
  <div>
    小米音响<Link to='/robot-detail/1'>去详情页</Link>
  </div>
)
const Robot = () => <div>米家扫地机器人</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>

const config = [
  {
    name: '手机',
    children: [
      {
        name: '小米',
        path: '/mi',
        children: [{ name: '小米CC', path: '/cc', component: CC }]
      },
      { name: '红米', path: '/red-mi', component: RedMi, withoutLayout: true },
      { name: '黑鲨', path: '/black-shark', component: BlackShark, extraData: { abc: 1 } }
    ]
  },
  { name: '电视', path: '/tv', component: TV },
  {
    name: '智能硬件',
    children: [
      { name: '音响', path: '/audio', component: SoundBox },
      { name: '扫地机器人', path: '/robot', component: Robot },
      { path: '/robot-detail/:id', component: RobotDetail }
    ]
  }
]

export default config
