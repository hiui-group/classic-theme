import React, { useCallback, useState, useRef } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Popper } from '@hi-ui/hiui'

const PopperMenu = ({ menu, selectedMenus, visible, setPopperVisible, onSelectMenu }) => {
  const popperRef = useRef(null)
  const menuRef = useRef(null)
  const [visibleMenu, setVisibleMenu] = useState([])

  const renderPopChildren = useCallback(
    (children, level = 0, selectedMenus) => {
      const _style = level === 0 ? {} : { position: 'absolute', left: 'calc(100% + 2px)', top: 0 }
      return (
        <ul style={_style} className={'mini-sider__menu'}>
          {children.map((subMenu) => (
            <li
              key={subMenu.id}
              className={'mini-sider__menu-item'}
              onMouseEnter={() => {
                setVisibleMenu((prevState) => prevState.concat(subMenu.id))
              }}
              onMouseLeave={() => {
                setVisibleMenu((prevState) => prevState.filter((vm) => vm !== subMenu.id))
              }}
            >
              <div
                className={classNames('menu-item__title', {
                  'menu-item__title--active': selectedMenus && selectedMenus.map((sm) => sm.id).includes(subMenu.id)
                })}
                onClick={() => {
                  if (subMenu.path) {
                    onSelectMenu(subMenu)
                    setPopperVisible(null)
                  }
                }}
              >
                {subMenu.name}
                {subMenu.children && subMenu.children.length > 0 && <Icon name='right' />}
              </div>
              {subMenu.children &&
                subMenu.children.length > 0 &&
                visibleMenu.includes(subMenu.id) &&
                renderPopChildren(subMenu.children, ++level, selectedMenus)}
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
        ref={menuRef}
        style={{ paddingLeft: 16 }}
        onClick={() => {
          if (menu.path) {
            onSelectMenu(menu)
            setPopperVisible(null)
          }
        }}
        className={classNames('menu__title', {
          'menu__leaf-title--active': selectedMenus && selectedMenus.map((sm) => sm.id).includes(menu.id)
        })}
      >
        <span>
          <Icon name={menu.icon || 'user'} />
        </span>
      </div>
      {menu.children && (
        <Popper
          show={visible}
          attachEle={menuRef.current}
          zIndex={1050}
          className='hi-theme__popper'
          placement='right-start'
          width={'auto'}
        >
          <div ref={popperRef}>{renderPopChildren(menu.children, 0, selectedMenus)}</div>
        </Popper>
      )}
    </React.Fragment>
  )
}

export default PopperMenu
