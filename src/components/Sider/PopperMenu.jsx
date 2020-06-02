import React, { useCallback, useState, useRef } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Popper } from '@hi-ui/hiui'
import useClickOutside from '../../hooks/useClickOutside'

const PopperMenu = ({ menu, selectedMenus, visible, setPopperVisible }) => {
  const popperRef = useRef(null)
  const menuRef = useRef(null)
  const [visibleMenu, setVisibleMenu] = useState([])
  // useClickOutside(popperRef, () => {
  //   setPopperVisible(false)
  // })

  const renderPopChildren = useCallback(
    (children, level = 0) => {
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
        ref={menuRef}
        style={{ paddingLeft: 16 }}
        className={classNames('menu__title', {
          'menu__leaf-title--active':
            selectedMenus &&
            selectedMenus.map((sm) => sm.id).includes(menu.id) &&
            menu.id !==
              (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1])
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
          <div ref={popperRef}>{renderPopChildren(menu.children)}</div>
        </Popper>
      )}
    </React.Fragment>
  )
}

export default PopperMenu
