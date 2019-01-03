# Theme

基于 React 的 HIUI 主题。

> 目前主题提供两种：Classic 、Genuine 
>
> Classic 可设置顶部一级导航
>
> Genuine 只支持左侧边栏导航

## 示例

**Classic**

![classic-white-flat](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/classic-white-flat.png)



**Genuine**

![genuine-white](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/genuine-white.png)



**Classic（含顶部导航）**

![classic-header](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/classic-header.png)



 ## 开始



#### Install

```shell
npm i @hi-ui/classic-theme --save
```

#### 使用

 通过 as 关键字指定为 Page，可快速更改

```

import { Classic as Page } from '@hi-ui/classic-theme' //经典主题
import { Genuine as Page } from '@hi-ui/classic-theme' //经典左右分栏主题

<Page />

```



#### 配置项

##### sider    侧边栏

> sider **Object**   指定侧边栏内容 
>
> *extend*  **Element** 侧边栏的扩展元素（出现在侧边栏的左下角）
>
> *items* **Array** 侧边栏内容数组
>
> ​	*title*  **String | Element**  显示的文字内容 必需
>
> ​	*icon* **Element** 文字 icon 可选
>
> ​	*children* **Array** 子元素 可选
>
> ​	*to* **String** 点击内容要跳转的路由 可选  如未指定 to 及 children，则表示为一个不可响应的纯文字内容

```javascript
const siders = {
  extend: <Login {...login} />,
  items: [
    {
      title: '小米手机',
      icon: <Icon name='usergroup' />,
      children: [
        {
          title: '小米 MIX3',
          to: '/products/mix3'
        },
      	...
      	,
        {
          title: '红米系列',
          children: [
            {
              title: '红米6',
              to: '/products/mi6'
            },
            ...
          ]
        }
      ]
    },
    {
     ...
    }
  ]
}

// use
<Page
	sider={siders}
    ...
/>
```



##### routeConfig   路由

> routeConfig   **Object**    用于侧边栏或顶部导航路由跳转
>
> hasTopNav   **Boolean**  是否包含顶部导航 （详见高级使用）
>
> routes    **Array**    配置同 React Router Config

```react
import Home from './pages/Home'
import About from './pages/About'

import {Mix3, Mi8, Mi6, TV4A, TV4S, PhoneStatistics, TVStatistics} from './pages/Products'

const routeConfig = {
  hasTopNav: true,
  routes: [{
    path: '/',
    component: Home,
    exact: true
  }, {
    path: '/products',
    component: SiderLayout,
    routes: [{
      path: '/mix3',
      component: Mix3
    }, {
      path: '/mi8',
      component: Mi8
    }, {
      path: '/mi6',
      component: Mi6
    }, {
      path: '/tv4a',
      component: TV4A
    }, {
      path: '/tv4s',
      component: TV4S
    }]
  }, {
    path: '/about',
    component: About
  }, {
    path: '/statistics',
    component: SiderLayout,
    routes: [{
      path: '/phone',
      component: PhoneStatistics
    }, {
      path: '/tv',
      component: TVStatistics
    }]
  }]
}

// use
<Page
	sider={...}
    routeConfig={routeConfig}
/>
```

#### 

##### header   顶部内容

> header 设置顶部 header 区域内容，可设置顶部导航（详见高级使用）。也可以设置任意内容
>
> header 可以为任意元素，传入的元素将被放置在除 Logo外的区域内
>
> 可以使用主题提供的 NavGroup 及 NavGroup.Item 进行布局
>
> **NavGroup**
>
> 将自定义内容分组放置，可通过 position 属性设置内容位置，接受 left|center|right 
>
> **NavGroup.Item**
>
> 无特殊意义，为元素添加了默认间距

```react
const header = (
  <React.Fragment>
    <NavGroup position='left'>
      <NavGroup.Item>
        <a href='javascript: void(0)'>切换站点</a>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='center'>
      <NavGroup.Item>
        <NavLink to='/' exact activeClassName='header__nav-link--active'>首页</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/products' activeClassName='header__nav-link--active'>产品系列</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/statistics' activeClassName='header__nav-link--active'>统计数据</NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/about' activeClassName='header__nav-link--active'>其它</NavLink>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup position='right'>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)

// use
<Page
	sider={...}
    routeConfig={...}
	header={header}
/>
```



##### logo 系统 LOGO

> 设置系统的 LOGO，根据主题样式的不同，放置方式及位置会不同
>
> **Logo** 组件由主题提供

```react
const logo = <Logo
      url='...'
      logoUrl='...'
      text='HIUI Demo'
      title='HIUI Classic Theme Demo'
      alt='Project Logo'
    />
      
// use
<Page
	sider={...}
    routeConfig={...}
	header={...}
    logo={logo}
/>
```



##### config 其它配置项

> config 为主题设置其它可配置内容
>
> ​	color    **String**    设置主题色  接受  white | black ，默认 white
>
> ​	type    **String**    设置内容区域布局方式  接受  card | flat ，默认 flat

```react
// use
<Page
    header={...}
    logo={...}
    routeConfig={...}
    sider={...}
    config={{
      color: 'white',
      type: 'flat'
    }}
/>

```

###### 示例

**Cliassic**

![classic-example](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/classic-example.png)



**Genuine**

![genuine-example](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/genuine-example.png)





#### 高级使用

> 关于顶部一级导航
>
> 由于导航与结构的限制，如需使用顶部一级导航（即在顶部 header 中含有路由跳转功能且需刷新下面的内容区域）则需在使用时进行一些特殊的配置

**一级导航实现的效果**

![topnav](https://raw.githubusercontent.com/hiui-group/classic-theme/master/assets/image/topnav.gif)

**如何使用顶部一级导航？**

hasTopNav 与 SiderLayout

- hasTopNav  标识一级导航
- SiderLayout 主题提供的一个特殊组件，用与划分含侧边栏与非侧边栏的内容

> SiderLayout 会将其子元素放置于侧边栏对应的视图范围内



**Routes Config 区别**

使用顶部一级导航时：

```react
const routeConfig = {
  hasTopNav: true, //通过 hasTopNav 标识表明使用顶部一级导航
  routes: [{
    path: '/',
    component: Home,
    exact: true
  }, {
    path: '/products',
    component: SiderLayout, //通过 SiderLayout 组件实现不同页面效果
    routes: [{
      path: '/mix3',
      component: Mix3
    }, ...]
  }, {
    path: '/about',
    component: About
  }, {
    path: '/statistics',
    component: SiderLayout,
    routes: [...]
  }]
}
```



使用正常侧边栏导航时：

```react
//正常侧边栏只含 routes 属性
const routeConfig = {
  routes: [{
      path: '/',
      exact: true,
      component: Home
  }, {
      path: '/products/mix3',
      component: Mix3
  }, {
      path: '/products/mi8',
      component: Mi8
  }, {
      path: '/products/mi6',
      component: Mi6
  }, {
      path: '/products/tv4a',
      component: TV4A
  }, {
      path: '/products/tv4s',
      component: TV4S
  }]
}
```



**Sider Config 区别**

如以上的示例，*产品数据* 与 *销量统计* 是两个分别含有侧边栏的页面，在配置 Sider 时，需配置对应路由需要显示的侧边栏内容



不使用一级导航 或 只有一个页面含有侧边栏时：

``` react
const siders = {
  extend: <Login {...login} />, //侧边栏左下方的额外元素
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
}
```



使用顶部一级导航，且含有两个以上不同的侧边栏页面时：

```react
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
```



*以上代码中 products 与 statistics*  与 routeConfig 中的两个 SiderLayout 所对应的 path 一致，系统会根据 path 去寻找对应的 sider 配置

-- EOF --