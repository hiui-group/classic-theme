import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../icon'
import Logo from '../Logo'
import Popper from '../popper'
import ClassNames from 'classnames'
import Tag from '../Tag'
import './style/index'
import Toggle from '../Toggle'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Header = ({
  mainMenu,
  activeMainMenu,
  logo,
  login,
  toolbar,
  mini,
  viewSize,
  setSiderVisible,
  siderVisible,
  type,
  onMenuClick,
  theme,
  color,
  tagsView,
  history,
  menu
}) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const popperRef = useRef(null)
  const loginRef = useRef(null)
  const logoConfig = typeof logo === 'function' ? logo(mini) : logo
  return (
    <div>
      <div
        className={ClassNames(
          'hi-theme__header',
          `hi-theme__header--${color === 'dark' && type === 'classic' ? 'dark' : 'light'}`,
          `theme__${theme}`
        )}
      >
        {viewSize === 'small' && (
          <Toggle
            show
            icon="menu"
            collapsed={!siderVisible}
            onToggle={() => {
              if (setSiderVisible) {
                setSiderVisible(!siderVisible)
              }
            }}
          />
        )}
        {((logo && type === 'classic') || (logo && type === 'genuine' && viewSize === 'small')) && (
          <Logo {...logoConfig} mini={viewSize === 'small'} layout="horizontal" />
        )}

        {mainMenu && (
          <ul className={`hi-theme__menu theme__${theme}`} style={{ flex: toolbar ? '0 0 auto' : 1 }}>
            {mainMenu.map((menu) => (
              <li
                key={menu.id}
                className={ClassNames('main-menu-item', {
                  'active-main-menu': activeMainMenu && menu.id === activeMainMenu.id
                })}
                onClick={() => {
                  onMenuClick && onMenuClick(menu)
                }}
              >
                {menu.path.match(reg) ? (
                  <a href={menu.path} target={menu.target || '_blank'}>
                    {menu.icon && <Icon name={menu.icon} style={{ marginRight: 4 }} />}
                    {menu.name}
                  </a>
                ) : (
                  <Link to={menu.path}>
                    {menu.icon && <Icon name={menu.icon} style={{ marginRight: 4 }} />}
                    {menu.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
        {toolbar && <div className="hi-theme__toolbar">{toolbar}</div>}
        {login && (
          <React.Fragment>
            <div
              className={'login__wrapper'}
              ref={loginRef}
              onClick={(e) => {
                setLoginVisible(!loginVisible)
              }}
            >
              {typeof menu.icon === 'string' ? <Icon name={menu.icon} style={{ marginRight: 4 }} /> : menu.icon}
              {login.name}
              <Icon name={'caret-down'} />
            </div>
            <Popper
              show={loginVisible}
              attachEle={loginRef.current}
              zIndex={1050}
              placement="bottom-end"
              width={false}
              onClickOutside={() => {
                setLoginVisible(false)
              }}
            >
              <div ref={popperRef} className={`login__menu--top theme__${theme}`}>
                {login.children}
              </div>
            </Popper>
          </React.Fragment>
        )}
      </div>
      {tagsView && <Tag history={history} menu={menu} onMenuClick={onMenuClick} />}
    </div>
  )
}

export default Header
