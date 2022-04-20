# 更新日志

## 3.7.1

- 修复 loginConfig props 中 icon 配置失效，icon 不展示 [#100](https://github.com/XiaoMi/hiui/issues/100)

## 3.7.0

- 添加 disabledAutoFallback props，支持禁用自动 fallback 到第一个有效路由 [#88](https://github.com/XiaoMi/hiui/issues/88)
- 优化 支持 React.lazy 模式和 keepAlive 模式兼容 [#87](https://github.com/XiaoMi/hiui/issues/87)

## 3.6.0

- 添加 unmountOnTagClose props，支持 keepAlive 模式下点击 tag 关闭触发组件实例销毁 [#85](https://github.com/XiaoMi/hiui/issues/85)

## 3.5.4

- 修复 keepAlive 组件内部使用 Link 刷新导致 Provider 数据无法获取 [#81](https://github.com/XiaoMi/hiui/issues/81)
- 修复 tagsView 在 hash 路由下刷新导致 tag 丢失 [#79](https://github.com/XiaoMi/hiui/issues/79)

## 3.5.3

- 修复 tagsView 模式下对 classic 模式的支持 [#77](https://github.com/XiaoMi/hiui/issues/77)

## 3.5.2

- 修复 tagsView 模式下 tag 无法正常被点击关闭 [#71](https://github.com/XiaoMi/hiui/issues/71)

## 3.5.1

- 修复 路由配置中增加 withoutLayout 属性后会导致组件重新 mount [#74](https://github.com/XiaoMi/hiui/issues/74)

## 3.5.0

- 新增 `hideInMenu` 控制菜单强制隐藏 [#69](https://github.com/XiaoMi/hiui/issues/69)
- 修复 `tagsView` 模式下 tag 无法正常被点击关闭 [#71](https://github.com/XiaoMi/hiui/issues/71)
- 允许路由菜单支持自定义 icon

## 3.4.0

- 新增 **keepAlive** 属性，缓存页面示例 [#49](https://github.com/XiaoMi/hiui/issues/49)
- 新增 **tagsView** 属性，控制页面顶部导航菜单的显示隐藏 [#49](https://github.com/XiaoMi/hiui/issues/49)
- 修复 **authority** 路由权限不生效问题 [#63](https://github.com/XiaoMi/hiui/issues/63)

## 3.3.0

- 新增 onMenuClick 属性，点击菜单获取菜单信息 [#51](https://github.com/XiaoMi/hiui/issues/51)
- 优化主题配色问题 [#55](https://github.com/XiaoMi/hiui/issues/55)

## 3.2.3

- 修复 withoutLayout 路由重复挂载的问题 [#47](https://github.com/XiaoMi/hiui/issues/47)

## 3.2.2

- 修复主题重定向警告 [#45](https://github.com/XiaoMi/hiui/issues/45)

## 3.2.1

- 修复路径为 '/' 时计算问题

## 3.2.0

- 支持 `defaultToggle` 设置默认侧边栏展示形态
- 支持路径为 '/' 时，自动重定向到第一个可访问的页面

## 3.1.0

- 支持 `dynamic` 动态布局

## 3.0.1

- 修复 `genuine` 模式下字体颜色不正确的问题

## 3.0.0

- 支持 `authority` 进行路由权限配置
- 支持 `pageHeader` 自定义页头
- 支持 `logo` 函数配置方式
- 调整 `apperance` 的配置方式
