import React, { useCallback, useState, useEffect, useRef } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon } from '@hi-ui/hiui'
// const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Sider = ({
  siderMenu,
  siderTopRender,
  siderBottomRender,
  selectedMenus,
  logo,
  login,
  setSiderMenu,
  history,
  getInitNav,
  color,
  accordion
}) => {
  const [mini, toggleMini] = useState(false)
  const [expandedId, setExpandedId] = useState([])
  useEffect(() => {
    setExpandedId(selectedMenus.map((sm) => sm.id))
  }, [])
  const renderChildren = useCallback(
    (menu, selectedMenus, level = 1, expandedId) => {
      return menu.map((m) => {
        return (
          <div className={'sider__menu-item'} key={m.id}>
            <div
              onClick={() => {
                let _expandedId = [...expandedId]
                if (_expandedId.includes(m.id)) {
                  _expandedId = _expandedId.filter((id) => id !== m.id)
                } else {
                  _expandedId.push(m.id)
                }
                setExpandedId(_expandedId)
              }}
              style={{ paddingLeft: level * 16 }}
              className={classNames('menu__title', {
                'menu__title--active':
                  selectedMenus &&
                  selectedMenus.map((sm) => sm.id).includes(m.id) &&
                  m.id !==
                    (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1]),
                'menu__leaf-title--active':
                  m.id ===
                  (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1])
              })}
            >
              <span>
                <Icon name={m.icon || 'user'} />
                {m.name}
              </span>

              {m.children && m.children.length > 0 && (
                <Icon name={expandedId.includes(m.id) ? 'up' : 'down'} />
              )}
            </div>
            {m.children && m.children.length > 0 && expandedId.includes(m.id) && mini === false && (
              <div>{renderChildren(m.children, selectedMenus, level + 1, expandedId)}</div>
            )}
          </div>
        )
      })
    },
    [mini]
  )
  return (
    <div className={classNames('hi-theme__sider', { 'hi-theme__sider--mini': mini })}>
      {logo && <div className={classNames('sider__logo', { mini: mini })}>{logo}</div>}
      {siderTopRender && siderTopRender(mini)}
      {siderMenu.length > 0 && (
        <div className='sider__menu'>{renderChildren(siderMenu, selectedMenus, 1, expandedId)}</div>
      )}
      {siderBottomRender && siderBottomRender(mini)}
      <div className='sider__footer'>
        <Icon
          name='list'
          onClick={() => {
            const _mini = !mini
            toggleMini(_mini)
          }}
        />
        {login && (
          <div className={'login__wrapper'}>
            <Icon name={login.icon} />
            {login.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sider
