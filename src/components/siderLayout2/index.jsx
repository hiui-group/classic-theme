import React, { Component } from 'react'
import Menu from '@hi-ui/hiui/es/menu'
// import ClassNames from 'classnames'
// import './style/index'

class Sider extends Component {
  // TODO: menus 改变的时候需要重置初始化 activeId
  render () {
    const { siderMenu, activeSiderMenu, logo, setSiderMenu, history } = this.props
    console.log('siderMenu', siderMenu)
    return (
      <div>
        {logo}
        <Menu
          mode='vertical'
          activeId={activeSiderMenu}
          onClick={id => {
            setSiderMenu(id)
            const navTo = siderMenu.find(item => item.id === id)
            history.push(navTo.pathname)
          }}
          datas={siderMenu}
        />
      </div>
    )
  }
}

export default Sider
