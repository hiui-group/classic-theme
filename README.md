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

## API

Theme

| 属性名      | 描述         | 类型                              | 默认值           |
| ----------- | ------------ | --------------------------------- | ---------------- |
| type        | 主题类型     | 'classic' \| 'genuine'            | 'classic'        |
| routes      | 路由配置项   | Route []                          | -                |
| logo        | 系统 logo    | ReactNode                         | -                |
| historyType | 路由跳转类型 | 'hashHistory' \| 'browserHistory' | 'browserHistory' |

Route

| 属性名    | 描述             | 类型      | 默认值 |
| --------- | ---------------- | --------- | ------ |
| name      | 菜单名称         | string    | -      |
| children  | 子菜单配置项     | Route []  | -      |
| path      | 菜单跳转路由     | string    | -      |
| component | 菜单对应页面组件 | ReactNode | -      |
