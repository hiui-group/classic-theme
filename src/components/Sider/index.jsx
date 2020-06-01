import React, { useCallback, useState, useEffect, useRef } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Popper } from '@hi-ui/hiui'
// const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const PopperMenu = ({ menu, selectedMenus }) => {
  const popperRef = useRef(null)
  const [popperVisible, setPopperVisible] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState([])
  console.log('VM', visibleMenu)
  const renderPopChildren = useCallback(
    (children, level = 0) => {
      const _style = level === 0 ? {} : { position: 'absolute', left: '100%', top: 0 }

      console.log(666, visibleMenu)
      return (
        <ul style={_style} className={'mini-sider__menu'}>
          {children.map((subMenu) => (
            <li
              key={subMenu.id}
              className={'mini-sider__menu-item'}
              onMouseEnter={() => {
                setVisibleMenu(visibleMenu.concat(subMenu.id))
              }}
              onMouseLeave={() => {
                setVisibleMenu(visibleMenu.filter((vm) => vm !== subMenu.id))
              }}
            >
              <div className='menu-item__title'>
                {subMenu.name}
                {subMenu.children && subMenu.children.length > 0 && <Icon name='right' />}
              </div>
              {subMenu.children &&
                subMenu.children.length > 0 &&
                visibleMenu.includes(subMenu.id) &&
                renderPopChildren(subMenu.children, ++level)}
            </li>
          ))}
        </ul>
      )
    },
    [visibleMenu]
  )

  return (
    <React.Fragment>
      <div
        ref={popperRef}
        style={{ paddingLeft: 16 }}
        className={classNames('menu__title', {
          'menu__leaf-title--active':
            selectedMenus &&
            selectedMenus.map((sm) => sm.id).includes(menu.id) &&
            menu.id !==
              (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1])
        })}
        // onMouseOut={() => setPopperVisible(false)}
        onMouseOver={() => {
          setPopperVisible(true)
        }}
      >
        <span>
          <Icon name={menu.icon || 'user'} />
        </span>
      </div>
      <Popper
        show
        attachEle={popperRef.current}
        zIndex={1050}
        className='hi-theme__popper'
        placement='right-start'
        width={'auto'}
      >
        {renderPopChildren(menu.children)}
      </Popper>
    </React.Fragment>
  )
}

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

  const renderMiniChildren = (menu, selectedMenus) => {
    return menu.map((m) => {
      return (
        <div className={'sider__menu-item'} key={m.id}>
          <PopperMenu menu={m} selectedMenus={selectedMenus} />
        </div>
      )
    })
  }
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
                {mini === false && m.name}
              </span>

              {m.children && m.children.length > 0 && (
                <Icon name={expandedId.includes(m.id) ? 'up' : 'down'} />
              )}
            </div>
            {m.children && m.children.length > 0 && expandedId.includes(m.id) && (
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
        <div className='sider__menu'>
          {mini
            ? renderMiniChildren(siderMenu, selectedMenus)
            : renderChildren(siderMenu, selectedMenus, 1, expandedId)}
        </div>
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
