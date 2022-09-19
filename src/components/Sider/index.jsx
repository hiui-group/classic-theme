import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import Logo from '../Logo'
import _ from 'lodash'
import Drawer from '@hi-ui/drawer'
import Popper from '@hi-ui/popper'
import Menu from '@hi-ui/menu'
import { RightOutlined } from '@hi-ui/icons'
import { cloneTree, findNodeById, isNullish, visitTree } from '@hi-ui/utils'
import { Avatar } from '@hi-ui/hiui'

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
  defaultToggle,
  activeId
}) => {
  const [mini, toggleMini] = useState(defaultToggle === 'mini' || false)
  const [expandedIds, setExpandedIds] = useState([])

  const [loginVisible, setLoginVisible] = useState(false)
  const [drawerLoginVisible, setDrawerLoginVisible] = useState(false)
  const siderRef = useRef(null)
  const popperRef = useRef(null)
  const loginRef = useRef(null)
  const drawerLoginRef = useRef(null)

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
      setExpandedIds(getId(siderMenu))
    }
  }, [siderMenu])
  useEffect(() => {
    setExpandedIds((expandedIds) => {
      return _.uniq(expandedIds.concat(selectedMenus.map((sm) => sm.id).slice(0, selectedMenus.length - 1)))
    })
  }, [selectedMenus])

  const logoConfig = typeof logo === 'function' ? logo(mini) : logo

  const siderMenuMemo = React.useMemo(() => {
    if (Array.isArray(siderMenu) && siderMenu.length > 0) {
      const menuData = cloneTree(siderMenu)
      visitTree(menuData, (node) => {
        node.title = node.name
      })
      return menuData
    }
    return []
  }, [siderMenu])

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
        {
          <>
            {logo && <Logo {...logoConfig} mini={mini} />}
            {siderTopRender && siderTopRender(mini)}

            {siderMenu.length > 0 ? (
              <Menu
                className="sider__menu"
                accordion={accordion}
                showCollapse={!(viewSize === 'small' && siderVisible === true)}
                collapsed={mini}
                onCollapse={toggleMini}
                expandedIds={mini ? undefined : expandedIds}
                onExpand={setExpandedIds}
                data={siderMenuMemo}
                activeId={activeId}
                onClick={(menuId) => {
                  if (onSelectMenu) {
                    onSelectMenu(findNodeById(siderMenuMemo, menuId))
                  }
                }}
                footerRender={({ collapsed, collapseNode }) => {
                  return (
                    <>
                      {siderBottomRender && siderBottomRender(mini)}
                      <div className="sider__footer">
                        {collapseNode}
                        {login && (
                          <>
                            <div
                              className={'sider__login'}
                              ref={loginRef}
                              onClick={(e) => {
                                setLoginVisible(!loginVisible)
                              }}
                            >
                              {isNullish(login.icon) ? null : (
                                <Avatar className="sider__login-user" icon={login.icon} src={login.avatar} size={20} />
                              )}
                              {mini ? null : (
                                <>
                                  {login.name ? <span className="sider__login-name">{login.name}</span> : null}
                                  <span className="sider__login-action">
                                    <RightOutlined />
                                  </span>
                                </>
                              )}
                            </div>
                            <Popper
                              visible={loginVisible}
                              attachEl={loginRef.current}
                              placement="right-end"
                              onClose={() => setLoginVisible(false)}
                            >
                              <div ref={popperRef} className={`login__menu--top theme__${theme}`}>
                                {login.children}
                              </div>
                            </Popper>
                          </>
                        )}
                      </div>
                    </>
                  )
                }}
              />
            ) : null}
          </>
        }
      </div>
      <Drawer
        className={'hi-theme__sider-drawer'}
        visible={viewSize === 'small' && siderVisible}
        placement="left"
        width={216}
        onClose={() => {
          setSiderVisible(false)
        }}
        style={{ position: 'absolute' }}
        container={container}
        closeable={false}
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

          {siderMenu.length > 0 ? (
            <Menu
              className="sider__menu"
              accordion={accordion}
              showCollapse={false}
              collapsed={false}
              data={siderMenuMemo}
              onClick={(menuId) => {
                if (onSelectMenu) {
                  onSelectMenu(findNodeById(siderMenuMemo, menuId))
                }
                setSiderVisible(false)
              }}
              footerRender={({ collapsed, collapseNode }) => {
                return (
                  <>
                    {siderBottomRender && siderBottomRender(mini)}
                    <div className="sider__footer">
                      {collapseNode}
                      {login && (
                        <>
                          <div
                            className={`sider__login theme__${theme}`}
                            ref={drawerLoginRef}
                            onClick={(e) => {
                              setDrawerLoginVisible(!drawerLoginVisible)
                            }}
                          >
                            {isNullish(login.icon) ? null : <span className="sider__login-user">{login.icon}</span>}
                            {mini ? null : (
                              <>
                                <span className="sider__login-name">{login.name}</span>
                                <span className="sider__login-action">
                                  <RightOutlined />
                                </span>
                              </>
                            )}
                          </div>
                          <Popper
                            visible={drawerLoginVisible}
                            attachEl={drawerLoginRef.current}
                            placement="right-end"
                            onClose={() => setDrawerLoginVisible(false)}
                          >
                            <div ref={popperRef} className={`login__menu--top theme__${theme}`}>
                              {login.children}
                            </div>
                          </Popper>
                        </>
                      )}
                    </div>
                  </>
                )
              }}
            />
          ) : null}
        </div>
      </Drawer>
    </>
  )
}

export default Sider
