import React, { Component } from 'react'
import Menu from '@hi-ui/hiui/es/menu'
// import ClassNames from 'classnames'
// import './style/index'

class Sider extends Component {
  // TODO: menus 改变的时候需要重置初始化 activeId
  render () {
    const { siderMenu, activeSiderMenu, logo, setSiderMenu } = this.props
    return (
      <div>
        {logo}
        <Menu
          mode='vertical'
          activeId={activeSiderMenu}
          onClick={id => setSiderMenu(id)}
          datas={siderMenu}
        />
      </div>
    )
  }
}

export default Sider
