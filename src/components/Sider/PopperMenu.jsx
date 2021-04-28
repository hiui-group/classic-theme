import React, { useCallback, useState, useRef } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import Icon from '../icon'
import Popper from '../popper'

const PopperMenu = ({ menu, selectedMenus, visible, setPopperVisible, onSelectMenu, siderRef, theme }) => {
  const popperRef = useRef(null)
  const menuRef = useRef(null)
  const [visibleMenu, setVisibleMenu] = useState([])

  const renderPopChildren = useCallback(
    (children, level = 0, selectedMenus) => {
      const _style = level === 0 ? {} : { position: 'absolute', left: 'calc(100% + 2px)', top: 0 }
      return (
        <ul style={_style} className={`mini-sider__menu theme__${theme}`}>
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
                onClick={(e) => {
                  e.stopPropagation()
                  if (subMenu.path) {
                    onSelectMenu(subMenu)
                    setPopperVisible(null)
                  }
                }}
              >
                {subMenu.name}
                {subMenu.children && subMenu.children.length > 0 && <Icon name="right" />}
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
        <span>{menu.icon ? <Icon name={menu.icon} /> : menu.name.substring(0, 1)}</span>
      </div>
      {menu.children && (
        <Popper
          container={siderRef.current}
          show={visible}
          attachEle={menuRef.current}
          zIndex={1050}
          setOverlayContainer={() => document.body}
          className="hi-theme__popper"
          placement="right-start"
          width={'auto'}
          onClickOutside={() => setPopperVisible(false)}
        >
          <div ref={popperRef}>{renderPopChildren(menu.children, 0, selectedMenus)}</div>
        </Popper>
      )}
    </React.Fragment>
  )
}

export default PopperMenu
