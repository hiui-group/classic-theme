import React from 'react'
import { Icon } from '@hi-ui/hiui'
// import { Login } from '../src'
// History.createHashHistory()

// const login = {
//   name: 'Admin',
//   icon: <span className='hi-icon icon-user' />,
//   children: [
//     <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
//     <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
//   ]
// }
const siders = {
  products: [
    {
      title: '小米手机',
      icon: <Icon name='usergroup' />,
      children: [
        {
          title: '小米 MIX3',
          to: '/products/mix3'
        },
        {
          title: '小米8青春版',
          to: '/products/mi8/white'
        },
        {
          title: '红米系列',
          children: [
            {
              title: '红米6',
              to: '/products/mi6'
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
          to: '/products/tv4s'
        },
        {
          title: '小米电视4A',
          to: '/products/tv4a'
        }
      ]
    }
  ],
  statistics: [
    {
      title: '销量统计',
      icon: <Icon name='usergroup' />,
      children: [
        {
          title: '手机销量',
          to: '/statistics/phone'
        },
        {
          title: '电视销量',
          to: '/statistics/tv'
        }
      ]
    }
  ]
}
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
