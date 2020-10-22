import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../icon'
import Logo from '../Logo'
import Popper from '../popper'
import ClassNames from 'classnames'
import './style/index'
const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Header = ({ mainMenu, activeMainMenu, logo, login, toolbar, mini }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const popperRef = useRef(null)
  const loginRef = useRef(null)
  const logoConfig = typeof logo === 'function' ? logo(mini) : logo
  return (
    <div className={ClassNames('hi-theme__header')}>
      {logo && <Logo {...logoConfig} mini={mini} layout="horizontal" />}

      {mainMenu && (
        <ul className="hi-theme__menu" style={{ flex: toolbar ? '0 0 auto' : 1 }}>
          {mainMenu.map((menu) => (
            <li
              key={menu.id}
              className={ClassNames('main-menu-item', {
                'active-main-menu': activeMainMenu && menu.id === activeMainMenu.id
              })}
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
            <Icon name={login.icon} />
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
            <div ref={popperRef} className="login__menu--top">
              {login.children}
            </div>
          </Popper>
        </React.Fragment>
      )}
    </div>
  )
}

export default Header
