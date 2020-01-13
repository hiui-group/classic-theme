<h1 align="center">Theme For HIUI</h1>

## 使用

```bash
npm i @hi-ui/classic-theme --save
// or
yarn add @hi-ui/classic-theme
```

```jsx
import Theme from '@hi-ui/classic-theme'

render(<Theme />, document.getElementById('app'))
```

## 示例

基于配置化实现主题布局和菜单匹配，数组中元素的层级即代表其在菜单中的层级

```jsx
import React, { Component } from 'react'
import { Theme } from '@hi-ui/classic-theme'
import { Link } from 'react-router-dom'
import { Input, Icon } from '@hi-ui/hiui'

const Mi = () => <div>小米手机</div>
const RedMi = () => <div>红米手机</div>
const BlackShark = () => <div>黑鲨手机</div>
const TV = () => <div>小米电视</div>
const SoundBox = () => (
  <div>
    小米音响<Link to='/robot-detail/1'>去详情页</Link>
  </div>
)
const Robot = () => <div>米家扫地机器人</div>
const RobotDetail = () => <div>米家扫地机器人详情页</div>

const routeConfig = [
  {
    name: '手机',
    children: [
      { name: '小米', path: '/mi', component: Mi },
      { name: '红米', path: '/red-mi', component: RedMi, withoutLayout: true },
      { name: '黑鲨', path: '/black-shark', component: BlackShark }
    ]
  },
  { name: '电视', path: '/tv', component: TV },
  {
    name: '智能硬件',
    children: [
      { name: '音响', path: '/audio', component: SoundBox },
      { name: '扫地机器人', path: '/robot', component: Robot },
      { path: '/robot-detail/:id', component: RobotDetail }
    ]
  }
]

const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: 'HIUI Theme',
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: 'Mi Guest',
  icon: 'user',
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
const toolbar = [<Input key='1' />, <Icon key='2' name='prompt' />]

class App extends Component {
  render() {
    return <Theme routes={routeConfig} logo={logoConfig} login={loginConfig} toolbar={toolbar} />
  }
}

export default App
```
## 关于路由跳转

### 组件内
使用 react-router `<Link />` 即可

### API 跳转
内部对 react-router 的 history 进行了封装

```jsx
import Theme, {History} from '@hi-ui/classic-theme'

History[`${your history type}`].push()
```

详细使用可参考 react-router 官网


## API

### Theme

| 属性名      | 描述                                     | 类型                              | 默认值                      |
| ----------- | ---------------------------------------- | --------------------------------- | --------------------------- |
| type        | 主题类型                                 | 'classic' \| 'genuine'            | 'classic'                   |
| routes      | 路由配置项                               | Route[]                           | -                           |
| logo        | 系统 logo                                | ReactNode                         | -                           |
| login       | 系统登录配置项                           | ReactNode                         | -                           |
| historyType | 路由跳转类型                             | 'hashHistory' \| 'browserHistory' | 'browserHistory'            |
| header      | genuine 类型下的顶部功能栏               | ReactNode \| null                 | 不传时默认为主题自带 header |
| apperance   | 主题外观配置项                           | Apperance                         | {color:'dark'}              |
| logo        | 主题 logo 配置项                         | Logo                              | -                           |
| login       | 主题登录信息配置项                       | Login                             | -                           |
| toolbar     | 顶部工具栏，一般用于放置通知、全局搜索等 | ReactNode                         | -                           |
| siderTopRender     | 侧边栏自定义顶部渲染区域 | toggle: boolean => ReactNode                         | -                           |
| siderBottomRender     | 侧边栏自定义底部渲染区域 | toggle: boolean => ReactNode                         | -                           |


### type: Route

| 属性名        | 描述                                     | 类型      | 默认值 |
| ------------- | ---------------------------------------- | --------- | ------ |
| name          | 菜单名称                                 | string    | -      |
| icon          | 菜单 icon                                | string    | -      |
| children      | 子菜单配置项                             | Route[]   | -      |
| path          | 菜单跳转路径                             | string    | -      |
| exact         | 菜单跳转路径是否严格匹配对应的 component | boolean   | true   |
| component     | 菜单对应页面组件                         | ReactNode | -      |
| withoutLayout | 页面组件渲染时，不显示顶部导航栏和侧边栏 | boolean   | false  |
| extraData     | 向路由匹配的页面组件注入额外的数据       | object    | -      |

### type: Apperance

| 属性名 | 描述     | 类型              | 默认值 |
| ------ | -------- | ----------------- | ------ |
| color  | 主题颜色 | 'dark' \| 'light' | 'dark' |

### tye: Logo

| 属性名  | 描述               | 类型   | 默认值 |
| ------- | ------------------ | ------ | ------ |
| name    | 系统名称           | string | -      |
| logoUrl | logo 图片地址      | string | -      |
| url     | 点击 logo 跳转地址 | string | -      |

### type: Login

| 属性名   | 描述          | 类型        | 默认值 |
| -------- | ------------- | ----------- | ------ |
| name     | 登录用户姓名  | string      | -      |
| icon     | 登录用户 icon | string      | -      |
| children | 登录菜单项    | ReactNode[] | -      |
