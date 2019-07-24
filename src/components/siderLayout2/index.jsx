import React, { Component } from 'react'
import Menu from '@hi-ui/hiui/es/menu'
// import ClassNames from 'classnames'
import './style/index.scss'

class Sider extends Component {
  // TODO: menus 改变的时候需要重置初始化 activeId
  render () {
    const { siderMenu, activeSiderMenu, logo, setSiderMenu, history, getInitNav } = this.props
    return (
      <div className='hi-theme__sider'>
        {logo && <div className='sider__logo'>{logo}</div>}
        <Menu
          mode='vertical'
          activeId={activeSiderMenu}
          onClick={id => {
            setSiderMenu(id)
            const navTo = getInitNav(siderMenu, id)
            history.push(navTo.pathname)
          }}
          datas={siderMenu}
        />
      </div>
    )
  }
}

export default Sider
