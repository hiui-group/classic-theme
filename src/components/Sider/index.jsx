import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import Tooltip from '../tooltip'
import Popper from '../popper'
import Icon from '../icon'
import Logo from '../Logo'
import NormalMenu from './NormalMenu'
import PopperMenu from './PopperMenu'
import Toggle from './Toggle'
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
  accordion
}) => {
  const [mini, toggleMini] = useState(false)
  const [expandedId, setExpandedId] = useState([])
  const [popperVisible, setPopperVisible] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const siderRef = useRef(null)
  const popperRef = useRef(null)
  const loginRef = useRef(null)
  const scrollBarSize = useRef(getScrollBarSize())
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
  const renderMiniChildren = useCallback(
    (menu, selectedMenus) => {
      return menu.map((m) => {
        return (
          <div
            className={'sider__menu-item'}
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
            <Tooltip title={m.name} placement='right' visible={tooltipVisible === m.id && popperVisible !== m.id}>
              <PopperMenu
                menu={m}
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
            sibling={menu}
            accordion={accordion}
            setExpandedId={setExpandedId}
            expandedId={expandedId}
            level={level}
            selectedMenus={selectedMenus}
            renderChildren={renderChildren}
            onSelectMenu={onSelectMenu}
          />
        )
      })
    },
    [onSelectMenu]
  )
  const logoConfig = typeof logo === 'function' ? logo(mini) : logo

  return (
    <div className={classNames('hi-theme__sider', { 'hi-theme__sider--mini': mini })} ref={siderRef}>
      {logo && <Logo {...logoConfig} mini={mini} />}
      {siderTopRender && siderTopRender(mini)}
      {siderMenu.length > 0 && (
        <div className='sider__menu'>
          <div style={{ height: '100%', overflowY: 'scroll', width: `calc(100% + ${scrollBarSize.current}px)` }}>
            {mini
              ? renderMiniChildren(siderMenu, selectedMenus)
              : renderChildren(siderMenu, selectedMenus, 1, expandedId)}
          </div>
        </div>
      )}
      {siderBottomRender && siderBottomRender(mini)}
      <div className='sider__footer'>
        <Toggle show mini={mini} onToggle={toggleMini} />
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
                <Icon name={login.icon} style={{ marginRight: 4 }} />
                {!mini && login.name}
              </span>
              {!mini && <Icon name={'right'} />}
            </div>
            <Popper
              show={loginVisible}
              attachEle={loginRef.current}
              zIndex={1050}
              placement='right-end'
              onClickOutside={() => setLoginVisible(false)}
              width={'auto'}
            >
              <div ref={popperRef} className='login__menu--top'>
                {login.children}
              </div>
            </Popper>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Sider
