import React from 'react'
import { Stepper } from '@hi-ui/hiui'
export default class Home extends React.Component {
  render () {
    const list = [
      {
        title: '账号信息'
      },
      {
        title: '邮箱激活'
      },
      {
        title: '信息登记'
      }
    ]
    return (
      <div>
       欢迎登录系统！！
        <Stepper
          list={list}
          current={1}
        />
      </div>
    )
  }
}
