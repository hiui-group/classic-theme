import React, { Component } from 'react'
import { Menu } from '@hi-ui/hiui/es'
import ClassNames from 'classnames'
import './style/index.scss'
import Logo from '../Logo'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi
class Sider extends Component {
  getMenuByIdx = (arr, parent) => {}
  render () {
    const {
      siderMenu,
      siderTopRender,
      siderBottomRender,
      activeSiderMenu,
      logo,
      setSiderMenu,
      history,
      getInitNav,
      mini,
      miniToggle,
      color,
      accordion
    } = this.props
    const logoConfig = typeof logo === 'function' ? logo(mini) : logo
    return (
      <div className={ClassNames('hi-theme__sider', color)}>
        {logo && (
          <div className={ClassNames('sider__logo', { mini: mini })}>
            <Logo {...logoConfig} />
          </div>
        )}
        {siderTopRender && siderTopRender(mini)}
        {siderMenu.length > 0 && (
          <Menu
            placement='vertical'
            accordion={accordion}
            collapsed={mini}
            activeId={activeSiderMenu}
            onClick={(id) => {
              setSiderMenu(id)
              const navTo = getInitNav(siderMenu, id)
              if (navTo.pathname.match(reg)) {
                window.open(navTo.pathname, navTo.target || '_blank')
              } else {
                history.push(navTo.pathname)
              }
            }}
            onClickSubMenu={(indexArr) => {
              let _menu
              indexArr.forEach((idx) => {
                if (_menu) {
                  _menu = _menu.children[idx]
                } else {
                  _menu = siderMenu[idx]
                }
              })
              if (_menu.component) {
                setSiderMenu(_menu.id)
                const navTo = getInitNav(siderMenu, _menu.id)
                if (navTo.pathname.match(reg)) {
                  window.open(navTo.pathname, navTo.target || '_blank')
                } else {
                  history.push(navTo.pathname)
                }
              }
            }}
            data={siderMenu}
          />
        )}
        {siderBottomRender && siderBottomRender(mini)}
        <div className='sider__footer'>
          <span
            className={ClassNames('sider__footer__toggle', {
              'sider__footer__toggle--light': color === 'dark'
            })}
            onClick={miniToggle}
          />
        </div>
      </div>
    )
  }
}

export default Sider
