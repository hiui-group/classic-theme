import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import Tooltip from '../tooltip'
import Popper from '../popper'
import Icon from '../icon'
import Logo from '../Logo'
import NormalMenu from './NormalMenu'
import PopperMenu from './PopperMenu'
import Toggle from '../Toggle'
import Drawer from '../Drawer'
import { getScrollBarSize } from '../../util/common'
import _ from 'lodash'

const getId = (menu, array = []) => {
  menu.forEach((m) => {
    if (m.children) {
      array.push(m.id)
      getId(m.children, array)
    }
  })
  return array
}

const Sider = ({
  siderMenu,
  siderTopRender,
  siderBottomRender,
  selectedMenus,
  logo,
  login,
  onSelectMenu,
  defaultExpandAll,
  accordion,
  onToggle,
  viewSize,
  siderVisible,
  setSiderVisible,
  color,
  type,
  container,
  theme,
  defaultToggle
}) => {
  const [mini, toggleMini] = useState(defaultToggle === 'mini' || false)
  const [expandedId, setExpandedId] = useState([])
  const [popperVisible, setPopperVisible] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const [drawerLoginVisible, setDrawerLoginVisible] = useState(false)
  const siderRef = useRef(null)
  const popperRef = useRef(null)
  const loginRef = useRef(null)
  const drawerLoginRef = useRef(null)
  const scrollBarSize = useRef(getScrollBarSize())

  useEffect(() => {
    if (!defaultToggle) {
      if (viewSize === 'large') {
        toggleMini(false)
      }
      if (viewSize === 'middle') {
        toggleMini(true)
      }
    }
  }, [viewSize, defaultToggle])
  useEffect(() => {
    if (defaultExpandAll) {
      setExpandedId(getId(siderMenu))
    }
  }, [siderMenu])
  useEffect(() => {
    setExpandedId((expandedId) => {
      return _.uniq(expandedId.concat(selectedMenus.map((sm) => sm.id).slice(0, selectedMenus.length - 1)))
    })
  }, [selectedMenus])
  const toggle = useCallback(
    (mini) => {
      if (onToggle) {
        onToggle(mini)
      }
      toggleMini(mini)
    },
    [onToggle]
  )
  const renderMiniChildren = useCallback(
    (menu, selectedMenus) => {
      return menu.map((m) => {
        return (
          <div
            className={`sider__menu-item theme__${theme}`}
            key={m.id}
            onMouseEnter={() => {
              setTooltipVisible(m.id)
            }}
            onMouseLeave={() => {
              setTooltipVisible(null)
            }}
            onClick={() => {
              if (popperVisible !== m.id) {
                setTooltipVisible(null)
                setPopperVisible(m.id)
              } else {
                setTooltipVisible(m.id)
                setPopperVisible(null)
              }
            }}
          >
            <Tooltip title={m.name} placement="right" visible={tooltipVisible === m.id && popperVisible !== m.id}>
              <PopperMenu
                menu={m}
                theme={theme}
                selectedMenus={selectedMenus}
                visible={popperVisible === m.id}
                setPopperVisible={setPopperVisible}
                onSelectMenu={onSelectMenu}
                siderRef={siderRef}
              />
            </Tooltip>
          </div>
        )
      })
    },
    [tooltipVisible, popperVisible, siderRef, onSelectMenu]
  )
  const renderChildren = useCallback(
    (menu, selectedMenus, level = 1, expandedId) => {
      return menu.map((m) => {
        return (
          <NormalMenu
            key={m.id}
            menu={m}
            theme={theme}
            sibling={menu}
            accordion={accordion}
            setExpandedId={setExpandedId}
            expandedId={expandedId}
            level={level}
            selectedMenus={selectedMenus}
            renderChildren={renderChildren}
            onSelectMenu={(menu) => {
              onSelectMenu(menu)
              if (siderVisible) {
                setSiderVisible(false)
              }
            }}
          />
        )
      })
    },
    [onSelectMenu, siderVisible]
  )
  const logoConfig = typeof logo === 'function' ? logo(mini) : logo

  return (
    <>
      <div
        className={classNames(
          'hi-theme__sider',
          `hi-theme__sider--${color === 'dark' && type === 'genuine' ? 'dark' : 'light'}`,
          `theme__${theme}`,
          {
            'hi-theme__sider--mini': mini,
            'hi-theme__sider--hide': viewSize === 'small'
            // 'hi-theme__sider--popup': viewSize === 'small' && siderVisible === true
          }
        )}
        ref={siderRef}
      >
        {logo && <Logo {...logoConfig} mini={mini} />}
        {siderTopRender && siderTopRender(mini)}
        {siderMenu.length > 0 && (
          <div className="sider__menu">
            <div style={{ height: '100%', overflowY: 'scroll', width: `calc(100% + ${scrollBarSize.current}px)` }}>
              {mini
                ? renderMiniChildren(siderMenu, selectedMenus)
                : renderChildren(siderMenu, selectedMenus, 1, expandedId)}
            </div>
          </div>
        )}
        {siderBottomRender && siderBottomRender(mini)}
        <div className="sider__footer">
          <Toggle show={!(viewSize === 'small' && siderVisible === true)} collapsed={mini} onToggle={toggle} />
          {login && (
            <React.Fragment>
              <div
                className={'sider__login'}
                ref={loginRef}
                onClick={(e) => {
                  setLoginVisible(!loginVisible)
                }}
              >
                <span>
                  <Icon name={login.icon} style={{ marginRight: mini ? 0 : 8 }} />
                  {!mini && login.name}
                </span>
                {!mini && (
                  <Icon name={'caret-right'} style={{ marginLeft: 4, color: loginVisible && 'var(--color-primary)' }} />
                )}
              </div>
              <Popper
                show={loginVisible}
                attachEle={loginRef.current}
                zIndex={1050}
                placement="right-end"
                onClickOutside={() => setLoginVisible(false)}
                width={'auto'}
                leftGap={2}
              >
                <div ref={popperRef} className={`login__menu--top theme__${theme}`}>
                  {login.children}
                </div>
              </Popper>
            </React.Fragment>
          )}
        </div>
      </div>
      <Drawer
        visible={viewSize === 'small' && siderVisible}
        placement="left"
        onClose={() => {
          setSiderVisible(false)
        }}
        container={container}
      >
        <div
          className={classNames(
            'hi-theme__sider',
            `hi-theme__sider--${color === 'dark' && type === 'genuine' ? 'dark' : 'light'}`
          )}
          ref={siderRef}
        >
          {logo && <Logo {...logoConfig} mini={false} />}
          {siderTopRender && siderTopRender(mini)}
          {siderMenu.length > 0 && (
            <div className="sider__menu">
              <div style={{ height: '100%', overflowY: 'scroll', width: `calc(100% + ${scrollBarSize.current}px)` }}>
                {renderChildren(siderMenu, selectedMenus, 1, expandedId)}
              </div>
            </div>
          )}
          {siderBottomRender && siderBottomRender(mini)}
          <div className="sider__footer">
            <Toggle show={!(viewSize === 'small' && siderVisible === true)} collapsed={mini} onToggle={toggle} />
            {login && (
              <React.Fragment>
                <div
                  className={`sider__login theme__${theme}`}
                  ref={drawerLoginRef}
                  onClick={(e) => {
                    setDrawerLoginVisible(!drawerLoginVisible)
                  }}
                >
                  <span>
                    <Icon name={login.icon} style={{ marginRight: 8 }} />
                    {login.name}
                  </span>
                  <Icon
                    name={'caret-right'}
                    style={{ marginLeft: 4, color: drawerLoginVisible && 'var(--color-primary)' }}
                  />
                </div>
                <Popper
                  show={drawerLoginVisible}
                  attachEle={drawerLoginRef.current}
                  zIndex={1050}
                  placement="right-end"
                  onClickOutside={() => setDrawerLoginVisible(false)}
                  width={'auto'}
                  leftGap={2}
                >
                  <div ref={popperRef} className={`login__menu--top theme__${theme}`}>
                    {login.children}
                  </div>
                </Popper>
              </React.Fragment>
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Sider
