import React, { useEffect } from 'react'
import { Select } from '@hi-ui/hiui'
import { Select as AntSelect } from 'antd'

import 'antd/dist/antd.css'

const { Option } = AntSelect
const Page2 = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log('发送请求')
    }, 1000)
  }, [])
  return (
    <div>
      <Select data={[]}></Select>

      <h2>四类</h2>
      <AntSelect defaultValue="lucy" style={{ width: 120 }}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </AntSelect>
      <div style={{ height: '100vh' }}></div>
    </div>
  )
}
export default Page2
