import React from 'react'

const Mi = () => <div>小米手机</div>
const RedMi = () => <div>红米手机</div>
const BlackShark = () => <div>黑鲨手机</div>
const TV = () => <div>小米电视</div>
const LUYOU = () => <div>小米路由器</div>
const Player = () => <div>小米音响</div>
const Robot = () => <div>米家扫地机器人</div>

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
      { name: '路由器', path: '/route', component: LUYOU },
      { name: '音响', path: '/audio', component: Player },
      { name: '扫地机器人', path: '/robot', component: Robot }
    ]
  }
]

const transformConfig = (config, parentId) => {
  config.forEach((c, index) => {
    c.id = parentId || parentId === 0 ? `${parentId}-${index}` : index
    if (c.children) {
      transformConfig(c.children, c.id)
    }
  })
  return config
}
export default transformConfig(config)
