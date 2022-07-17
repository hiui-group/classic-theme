import React, { useState, useRef } from 'react'
import Logo from '../Logo'
import Popper from '@hi-ui/popper'
import ClassNames from 'classnames'
import './style/index'
import Toggle from '../Toggle'
import { Avatar, Menu } from '@hi-ui/hiui'
import { cx, isArrayNonEmpty } from '@hi-ui/utils'
import { CaretDownFilled } from '@hi-ui/icons'

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
  onSelectMenu,
  theme,
  color,
  tagsView,
  history,
  menu
}) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const popperRef = useRef(null)
  const logoConfig = typeof logo === 'function' ? logo(mini) : logo

  const [loginElement, setLoginElement] = useState(null)

  const mainMenuMemo = React.useMemo(() => {
    if (!isArrayNonEmpty(mainMenu)) return []

    return mainMenu.map((item) => {
      return {
        ...item,
        title: item.name,
        children: undefined
      }
    })
  }, [mainMenu])

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
            // icon="menu"
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

        {isArrayNonEmpty(mainMenu) ? (
          <Menu
            className={cx('hi-theme__menu', theme && `theme__${theme}`)}
            placement="horizontal"
            data={mainMenuMemo}
            activeId={activeMainMenu ? activeMainMenu.id : ''}
            onClick={(nextId) => {
              const menuItem = mainMenu.find((item) => item.id === nextId)
              onSelectMenu && onSelectMenu(menuItem)
            }}
          />
        ) : null}
        {toolbar && <div className="hi-theme__toolbar">{toolbar}</div>}
        {login && (
          <React.Fragment>
            <div
              className={'login__wrapper'}
              ref={setLoginElement}
              onClick={(e) => {
                setLoginVisible(!loginVisible)
              }}
            >
              {login.name ? (
                <>
                  <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                    <Avatar icon={login.icon} src={login.avatar} size={20} />
                    <span>{login.name}</span>
                  </div>
                  <CaretDownFilled />
                </>
              ) : (
                <Avatar icon={login.icon} src={login.avatar} size={34} />
              )}
            </div>

            <Popper
              visible={loginVisible}
              attachEl={loginElement}
              zIndex={1050}
              placement="bottom-end"
              // width={false}
              onClose={() => {
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
    </div>
  )
}

export default Header
