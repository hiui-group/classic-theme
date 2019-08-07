import React, { Component } from 'react'
import { Menu } from '@hi-ui/hiui/es'
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
          placement='vertical'
          collapsed={mini}
          activeId={activeSiderMenu}
          onClick={id => {
            setSiderMenu(id)
            const navTo = getInitNav(siderMenu, id)
            history.push(navTo.pathname)
          }}
          data={siderMenu}
        />

        <div className='sider__footer'>
          <span className='sider__footer__toggle' onClick={miniToggle} />
        </div>
      </div>
    )
  }
}

export default Sider
