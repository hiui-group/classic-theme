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

```jsx

import { Classic as Page } from '@hi-ui/classic-theme' //经典主题
import { Genuine as Page } from '@hi-ui/classic-theme' //经典左右分栏主题

<Page 
  header={...}
  logo={...}
  breadcrumb={...}
  routes={...}
  ...
/>

```



##### routes   路由

routes 接收一个路由配置数组

```javascript
[{
    path: String //路径
    component: React.Component //匹配到对应路径时要渲染的组件
    exact: Boolean //是否严格匹配
    render: Function //自定义渲染方法 详见高级使用
}]
```



```react
// 示例:
const routes = [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/about',
  component: About
}]

// use
<Page
	routes={routes}
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
  routes={...}
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
  routes={...}
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
    routes={...}
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



**如何使用侧边栏导航？**

在 router 配置中使用 render 方法，自定义渲染，在方法中返回 SiderLayout 包裹的元素

> SiderLayout 会将其子元素放置于侧边栏对应的视图范围内



```react
// 在 classic-theme 中引入 SiderLayout 组件
import { SiderLayout } from '@hi-ui/classic-theme'

const siders =  [{
    title: '小米手机',
    children: [
      {
        title: <i>小米 MIX3</i>,
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
          }
        ]
      }
    ]
  },
  {
    title: '电视品类',
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


const routes = [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/products', // 当匹配到 products 路径时，将展现 Sider 布局
  render: props => {
    return (
      <SiderLayout
        sider={siders}
        extend={<Login {...login} />}
        routes={
          [{
            path: '/products/mix3',
            component: Mix3,
            name: 'test1'
          }, {
            path: '/products/mi8/:id',
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
        {...props}
      />
    )
  }
},...]
```



**SiderLayout**

>  专门用于生成含侧边栏的组件，通过在 routes 中自定义 render 方法，返回该组件，即可生成含有侧边栏的顶层组件

配置项：

- sider 侧边栏的内容及对应的路径 ，必需
- extend 额外组件，例如登录信息，可通过 extend 传入，该组件会被渲染至左侧 sider 的下方
- routes 与 sider 相应的路由匹配

-- EOF --