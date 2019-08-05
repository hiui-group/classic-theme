<h1 align="center">Theme For HIUI</h1>

## 使用

```bash
npm i @hi-ui/classic-theme --save
// or
yarn add @hi-ui/classic-theme
```

```jsx
import HIUITheme from '@hi-ui/classic-theme'

render(<HIUITheme />, document.getElementById('app'))
```

## 示例

```jsx
import React, { Component } from 'react'
import { Theme, Logo, Login } from '@hi-ui/classic-theme'
import { Link } from 'react-router-dom'

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
      { name: '红米', path: '/red-mi', component: RedMi },
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

const logo = (
  <Logo
    url='https://xiaomi.github.io/hiui/#/'
    logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
    text='HIUI Demo'
  />
)

const loginConfig = {
  name: 'Mi Guest',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
const login = <Login {...loginConfig} />
class App extends Component {
  render() {
    return <Theme routes={routeConfig} logo={logo} login={login} type='classic' />
  }
}

export default App
```

## API

Theme

| 属性名      | 描述                       | 类型                              | 默认值                      |
| ----------- | -------------------------- | --------------------------------- | --------------------------- |
| type        | 主题类型                   | 'classic' \| 'genuine'            | 'classic'                   |
| routes      | 路由配置项                 | Route[]                           | -                           |
| logo        | 系统 logo                  | ReactNode                         | -                           |
| login       | 系统登录配置项             | ReactNode                         | -                           |
| historyType | 路由跳转类型               | 'hashHistory' \| 'browserHistory' | 'browserHistory'            |
| header      | genuine 类型下的顶部功能栏 | ReactNode \| null                 | 不传时默认为主题自带 header |

Route

| 属性名    | 描述                                     | 类型      | 默认值 |
| --------- | ---------------------------------------- | --------- | ------ |
| name      | 菜单名称                                 | string    | -      |
| icon      | 菜单 icon                                | string    | -      |
| children  | 子菜单配置项                             | Route[]   | -      |
| path      | 菜单跳转路径                             | string    | -      |
| exact     | 菜单跳转路径是否严格匹配对应的 component | boolean   | true   |
| component | 菜单对应页面组件                         | ReactNode | -      |
