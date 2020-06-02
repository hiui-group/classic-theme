import React, { useCallback, useState, useRef } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Popper } from '@hi-ui/hiui'

const PopperMenu = ({ menu, selectedMenus }) => {
  const popperRef = useRef(null)
  const [popperVisible, setPopperVisible] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState([])
  const renderPopChildren = useCallback(
    (children, level = 0) => {
      const _style = level === 0 ? {} : { position: 'absolute', left: '100%', top: 0 }
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
        onClick={() => {
          setPopperVisible(true)
        }}
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
      <Popper
        show={popperVisible}
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

export default PopperMenu
