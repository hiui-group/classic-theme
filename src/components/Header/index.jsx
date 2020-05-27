import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@hi-ui/hiui/es/icon'
import ClassNames from 'classnames'
import './style/index'
const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Header = ({ mainMenu, activeMainMenu, logo, login, setMainMenu, color, toolbar, mini }) => {
  return (
    <div className={ClassNames('hi-theme__header', { 'hi-theme__header--mini': mini }, color)}>
      {logo && <div className='hi-theme__logo'>{logo}</div>}

      {mainMenu && (
        <ul className='hi-theme__menu' style={{ flex: toolbar ? '0 0 auto' : 1 }}>
          {mainMenu.map((menu) => (
            <li
              key={menu.id}
              className={ClassNames('main-menu-item', {
                'active-main-menu': menu.id === activeMainMenu.id
              })}
            >
              {menu.path.match(reg) ? (
                <a href={menu.path} target={menu.target || '_blank'}>
                  {menu.icon && <Icon name={menu.icon} style={{ marginRight: 4 }} />}
                  {menu.name}
                </a>
              ) : (
                <Link to={menu.path} onClick={() => setMainMenu(menu.id, menu.component)}>
                  {menu.icon && <Icon name={menu.icon} style={{ marginRight: 4 }} />}
                  {menu.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      {toolbar && <div className='hi-theme__toolbar'>{toolbar}</div>}
      {login && <div className='hi-theme__login'>{login}</div>}
    </div>
  )
}

export default Header
