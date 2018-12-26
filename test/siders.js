import React from 'react'
import { Icon } from '@hi-ui/hiui'
const siders = {
  products: {
    items: [
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
            to: '/products/mi8'
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
    ]
  },
  statistics: {
    items: [
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
}
// const siders = {
//   items: [
//     {
//       title: '模板',
//       icon: <Icon name='usergroup' />,
//       children: [
//         {
//           title: '模板一',
//           to: '/template/t1'
//         },
//         {
//           title: '模板二',
//           to: '/template/t2'
//         },
//         {
//           title: '额外模板',
//           children: [
//             {
//               title: '额外模板一',
//               to: '/outer/1'
//             },
//             {
//               title: '虚拟分组',
//               type: 'title'
//             },
//             {
//               title: '额外模板二',
//               to: '/outer/2'
//             },
//             {
//               title: '额外模板三',
//               to: '/outer/3'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       title: '配色',
//       to: '',
//       icon: <Icon name='usergroup' />,
//       children: [
//         {
//           title: '灰色',
//           to: '/color/gray'
//         },
//         {
//           title: '蓝色',
//           to: '/color/blue'
//         }
//       ]
//     }
//   ]

// }
export default siders
