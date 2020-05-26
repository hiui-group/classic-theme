import React, { useCallback } from 'react'
// import Menu from './menu'
import classNames from 'classNames'
import './style/index.scss'
import { Icon } from '@hi-ui/hiui'
// const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Sider = ({
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
}) => {
  const renderChildren = useCallback((menu, selectedMenus, level = 1) => {
    return menu.map((m) => {
      return (
        <div className={'sider__menu-item'} key={m.id}>
          <div
            style={{ paddingLeft: level * 16 }}
            className={classNames('menu__title', {
              'menu__title--active':
                selectedMenus && selectedMenus.map((sm) => sm.id).includes(m.id),
              'menu__leaf-title--active':
                m.type === 'page' &&
                m.id === selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1]
            })}
          >
            {m.title}
            {m.children && m.children.length > 0 && <Icon name='up' />}
          </div>
          {m.children &&
            m.children.length > 0 &&
            renderChildren(m.children, selectedMenus, level + 1)}
        </div>
      )
    })
  }, [])
  return (
    <div className={classNames('hi-theme__sider', color)}>
      {logo && <div className={classNames('sider__logo', { mini: mini })}>{logo}</div>}
      {siderTopRender && siderTopRender(mini)}
      {siderMenu.length > 0 && renderChildren(siderMenu)}
      {siderBottomRender && siderBottomRender(mini)}
      <div className='sider__footer'>
        <span
          className={classNames('sider__footer__toggle', {
            'sider__footer__toggle--light': color === 'dark'
          })}
          onClick={miniToggle}
        />
      </div>
    </div>
  )
}

export default Sider
