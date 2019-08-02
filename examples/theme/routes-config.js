import React from 'react'
import { Link } from 'react-router-dom'

const Mi = () => <div>小米手机</div>
const RedMi = () => <div>红米手机</div>
const BlackShark = () => <div>黑鲨手机</div>
const TV = () => <div>小米电视</div>
const SoundBox = () => (
  <div>
    小米音响<Link to='/robot-detail'>去详情页</Link>
  </div>
)
const Robot = () => <div>米家扫地机器人</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>

const config = [
  { name: '电视', path: '/tv', component: TV },
  {
    name: '手机',
    children: [
      { name: '小米', path: '/mi', component: Mi },
      { name: '红米', path: '/red-mi', component: RedMi },
      { name: '黑鲨', path: '/black-shark', component: BlackShark }
    ]
  },
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
