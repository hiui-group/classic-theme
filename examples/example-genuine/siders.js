import React from 'react'
import { Icon } from '@hi-ui/hiui'

// History.createHashHistory()

const siders = [{
  content: '首页',
  to: '/'
},
{
  content: '小米手机',
  icon: <Icon name='usergroup' />,
  children: [
    {
      content: <i>小米官网</i>,
      to: 'http://mi.com',
      outerChain: true
    },
    {
      content: <i>小米 MIX3</i>,
      to: '/mix3',
      icon: <Icon name='usergroup' />
    },
    {
      content: '小米8青春版',
      to: '/mi8/white',
      icon: <Icon name='usergroup' />
    },
    {
      content: '红米系列',
      children: [
        {
          content: '红米6',
          to: '/mi6'
        },
        {
          content: '红米6 Pro'
        },
        {
          content: '红米6A'
        },
        {
          content: '红米 Note5'
        }
      ]
    }
  ]
},
{
  content: '电视品类',
  icon: <Icon name='usergroup' />,
  children: [
    {
      content: '小米电视4S',
      to: '/tv4s'
    },
    {
      content: '小米电视4A',
      to: '/tv4a'
    }
  ]
}
]
export default siders
