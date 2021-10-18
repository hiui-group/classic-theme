import React, { useMemo, useRef } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route, Redirect, Switch } from 'react-router-dom'
import './style/index'
import Footer from '../Footer'
import useMainMenu from '../../hooks/useMainMenu'
import { getRoutes, filterMenu, checkAuth } from '../../util/common'
import useMenuCalculator from '../../hooks/useMenuCalculator'
import _ from 'lodash'
import Tag from '../Tag'

const ClassicLayout = ({
  apperance,
  menu,
  location,
  history,
  logo,
  login,
  toolbar,
  fallback,
  siderTopRender,
  siderBottomRender,
  footer,
  defaultExpandAll,
  accordion,
  pageHeader,
  onToggle,
  authority,
  viewSize,
  siderVisible,
  setSiderVisible,
  type,
  onMenuClick,
  theme,
  tagsView,
  defaultToggle
}) => {
  const containerRef = useRef(null)
  const mainMenu = useMainMenu(menu, authority)
  const { currentMenu, selectedMenus, onSelectMenu, defaultPath } = useMenuCalculator(
    menu,
    { location, history },
    fallback,
    onMenuClick
  )
  const isWithoutLayout = currentMenu && currentMenu.withoutLayout
  const activeMainMenu = selectedMenus[0]
  const siderMenu = (selectedMenus[0] && selectedMenus[0].children) || []
  const routes = getRoutes(menu)
  const _siderMenu = useMemo(() => {
    const __siderMenu = _.cloneDeep(siderMenu)
    return filterMenu(__siderMenu, authority)
  }, [siderMenu, authority])

  return [
    !isWithoutLayout && (
      <Header
        key="header"
        mainMenu={mainMenu}
        activeMainMenu={activeMainMenu}
        location={location}
        logo={logo}
        login={login}
        theme={theme}
        toolbar={toolbar}
        menu={menu}
        tagsView={tagsView}
        history={history}
        onMenuClick={onMenuClick}
        type={type}
        siderVisible={siderVisible}
        setSiderVisible={setSiderVisible}
        viewSize={viewSize}
        color={apperance.color}
      />
    ),
    (!isWithoutLayout && (
      <div key="container" className={`hi-theme--classic theme__${theme}`} ref={containerRef}>
        {_siderMenu.length > 0 && (
          <Sider
            siderMenu={_siderMenu}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            selectedMenus={selectedMenus}
            onSelectMenu={onSelectMenu}
            defaultExpandAll={defaultExpandAll}
            accordion={accordion}
            theme={theme}
            onToggle={onToggle}
            viewSize={viewSize}
            siderVisible={siderVisible}
            setSiderVisible={setSiderVisible}
            type={type}
            color={apperance.color}
            container={containerRef.current}
            defaultToggle={defaultToggle}
          />
        )}
        <div className="hi-theme__wrapper">
          {tagsView ? <Tag history={history} menu={menu} onMenuClick={onMenuClick} /> : null}
          {pageHeader ? pageHeader(selectedMenus, location) : null}
          <div
            className="hi-theme__content"
            style={{ padding: apperance.contentPadding, background: apperance.contentBackground }}
          >
            <Switch>
              {routes.map((route, index) => {
                return checkAuth(authority, route.authority) ? (
                  <Route
                    key={index}
                    path={route.path}
                    render={(props) => <route.component {...props} extraData={route.extraData} />}
                    exact={!!route.exact}
                  />
                ) : null
              })}
              <Redirect
                to={{
                  pathname: location.pathname === '/' ? defaultPath : fallback || defaultPath
                }}
              />
            </Switch>
          </div>
          {footer && <Footer footer={footer} />}
        </div>
      </div>
    )) || (
      <Route
        key="withoutLayout"
        path={currentMenu.path}
        component={currentMenu.component}
        exact={!!currentMenu.exact}
      />
    )
  ]
}

export default ClassicLayout
