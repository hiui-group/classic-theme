import React from 'react'
import { Icon } from '@hi-ui/hiui'

// History.createHashHistory()

const siders = [{
  title: '首页',
  to: '/genuine/home'
},
{
  title: '小米手机',
  icon: <Icon name='usergroup' />,
  children: [
    {
      title: <i>小米官网</i>,
      to: 'http://mi.com',
      outerChain: true
    },
    {
      title: <i>小米 MIX3</i>,
      to: '/genuine/mix3',
      icon: <Icon name='usergroup' />
    },
    {
      title: '小米8青春版',
      to: '/genuine/mi8/white',
      icon: <Icon name='usergroup' />
    },
    {
      title: '红米系列',
      children: [
        {
          title: '红米6',
          to: '/genuine/mi6'
        },
        {
          title: '红米6 Pro'
        },
        {
          title: '红米6A'
        },
        {
          title: '红米 Note5'
        }
      ]
    }
  ]
},
{
  title: '电视品类',
  icon: <Icon name='usergroup' />,
  children: [
    {
      title: '小米电视4S',
      to: '/genuine/tv4s'
    },
    {
      title: '小米电视4A',
      to: '/genuine/tv4a'
    }
  ]
}
]
// const siders = {
//   extend: <Login {...login} />,
//   items: [
//     {
//       title: '小米手机',
//       icon: <Icon name='usergroup' />,
//       children: [
//         {
//           title: '小米 MIX3',
//           to: '/products/mix3'
//         },
//         {
//           title: '小米8青春版',
//           to: '/products/mi8'
//         },
//         {
//           title: '红米系列',
//           children: [
//             {
//               title: '红米6',
//               to: '/products/mi6'
//             },
//             {
//               title: '红米6 Pro'
//             },
//             {
//               title: '红米6A'
//             },
//             {
//               title: '红米 Note5'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       title: '电视品类',
//       icon: <Icon name='usergroup' />,
//       children: [
//         {
//           title: '小米电视4S',
//           to: '/products/tv4s'
//         },
//         {
//           title: '小米电视4A',
//           to: '/products/tv4a'
//         }
//       ]
//     }
//   ]
// }
export default siders
