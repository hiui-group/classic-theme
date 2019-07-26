import React, { Component } from 'react'
import Menu from '@hi-ui/hiui/es/menu'
import Icon from '@hi-ui/hiui/es/icon'
import ClassNames from 'classnames'
import './style/index.scss'

class Sider extends Component {
  render () {
    const {
      siderMenu,
      activeSiderMenu,
      logo,
      setSiderMenu,
      history,
      getInitNav,
      mini,
      miniToggle,
      color
    } = this.props
    return (
      <div className={ClassNames('hi-theme__sider', color)}>
        {logo && <div className={ClassNames('sider__logo', { mini: mini })}>{logo}</div>}
        <Menu
          mode='vertical'
          mini={mini}
          activeId={activeSiderMenu}
          onClick={id => {
            setSiderMenu(id)
            const navTo = getInitNav(siderMenu, id)
            history.push(navTo.pathname)
          }}
          datas={siderMenu}
        />

        <div className='sider__footer'>
          <span className='sider__footer__toggle' onClick={miniToggle}>
            <Icon name='list' />
          </span>
        </div>
      </div>
    )
  }
}

export default Sider
