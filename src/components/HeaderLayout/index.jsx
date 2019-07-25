import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import './style/index'

class Header extends Component {
  render () {
    const { mainMenu, activeMainMenu, logo, login, setMainMenu, color } = this.props
    return (
      <div className={ClassNames('hi-theme__header', color)}>
        {logo && <div className='hi-theme__logo'>{logo}</div>}

        {mainMenu && (
          <ul className='hi-theme__menu'>
            {mainMenu.map(menu => (
              <li
                key={menu.id}
                className={ClassNames('main-menu-item', {
                  'active-main-menu': menu.id === activeMainMenu
                })}
              >
                <Link to={menu.pathname} onClick={() => setMainMenu(menu.id)}>
                  {menu.content}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {login}
      </div>
    )
  }
}

export default Header
