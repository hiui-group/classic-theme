import React from 'react'
import { Link } from 'react-router-dom'
import Table from '@mi/power-table'
// import '@mi/power-table/lib/power-table.css'

let columns = [
  {
    title: '商品名',
    dataKey: 'name'
  },
  {
    title: '品类',
    dataKey: 'type'
  },
  {
    title: '规格',
    dataKey: 'size'
  },
  {
    title: '单价',
    dataKey: 'price'
  },
  {
    title: '门店',
    dataKey: 'address'
  },
  {
    title: '库存',
    dataKey: 'stock'
  }
]

let data = [
  {
    name: '小米9',
    type: '手机',
    size: '6G+64G 全息幻彩蓝',
    price: '3299.00',
    address: '华润五彩城店',
    stock: '29,000',
    key: 1
  },
  {
    name: '小米9 SE',
    type: '手机',
    size: '6G+64G 全息幻彩蓝',
    price: '1999.00',
    address: '清河店',
    stock: '10,000',
    key: 2
  },
  {
    name: '小米8',
    type: '手机',
    size: '6G+64G 全息幻彩蓝',
    price: '2599.00',
    address: '双安店',
    stock: '12,000',
    key: 3
  },
  {
    name: 'Redmi Note7',
    type: '手机',
    size: '6G+64G 全息幻彩蓝',
    price: '999.00',
    address: '华润五彩城店',
    stock: '140,000',
    key: 4
  },
  {
    name: '小米8 SE',
    type: '手机',
    size: '6G+64G 全息幻彩蓝',
    price: '699.00',
    address: '双安店',
    stock: '12,000',
    key: 5
  }
]

const CC = () =>
  <div>
    小米CC
    <div style={{ width: 1100 }}>
      <Table columns={columns} data={data} />
    </div>
  </div>
const RedMi = () => <div>红米手机</div>
const BlackShark = props => {
  return <div>黑鲨手机</div>
}
// const TV = () => <div>小米电视</div>
const SoundBox = () =>
  <div>
    小米音响<Link to="/robot-detail/1">去详情页</Link>
  </div>
const Robot = () => <div>米家扫地机器人</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>

const config = [
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
  // { name: '电视', path: '/tv', component: TV },
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
