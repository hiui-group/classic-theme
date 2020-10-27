import React, { useMemo } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import Footer from '../Footer'
import { Route, Redirect } from 'react-router-dom'
import ClassNames from 'classnames'
import './style/index'
import { getRoutes, filterMenu, checkAuth } from '../../util/common'
import useMenuCalculator from '../../hooks/useMenuCalculator'
import _ from 'lodash'

const GenuineLayout = ({
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
  header,
  defaultExpandAll,
  accordion,
  pageHeader,
  onToggle,
  authority,
  viewSize,
  siderVisible,
  setSiderVisible
}) => {
  const { currentMenu, selectedMenus, onSelectMenu } = useMenuCalculator(menu, { location, history }, fallback)
  const isWithoutLayout = currentMenu && currentMenu.withoutLayout
  const _header = header === null || header || (
    <Header toolbar={toolbar} viewSize={viewSize} setSiderVisible={setSiderVisible} />
  )
  const routes = getRoutes(menu)
  const _siderMenu = useMemo(() => {
    const _menu = _.cloneDeep(menu)
    return filterMenu(_menu, authority)
  }, [menu, authority])
  return [
    (!isWithoutLayout && (
      <div key="container" className="hi-theme--genuine">
        {menu.length > 0 && (
          <Sider
            siderMenu={_siderMenu}
            selectedMenus={selectedMenus}
            onSelectMenu={onSelectMenu}
            login={login}
            defaultExpandAll={defaultExpandAll}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            logo={logo}
            accordion={accordion}
            onToggle={onToggle}
            viewSize={viewSize}
            siderVisible={siderVisible}
            setSiderVisible={setSiderVisible}
          />
        )}
        <div className={ClassNames('hi-theme__container')}>
          {_header}
          <div className="hi-theme__wrapper">
            {pageHeader ? pageHeader(selectedMenus, location) : null}
            <div
              className={ClassNames('hi-theme__content', {
                'hi-theme--no-header': header === null
              })}
              style={{ padding: apperance.contentPadding, background: apperance.contentBackground }}
            >
              {routes.map((route, index) => {
                return checkAuth(authority, route.authority) ? (
                  <Route
                    key={index}
                    path={route.path}
                    render={(props) => <route.component {...props} extraData={route.extraData} />}
                    exact={!!route.exact}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: fallback
                    }}
                  />
                )
              })}
            </div>
            {footer && <Footer footer={footer} />}
          </div>
        </div>
      </div>
    )) || (
      <Route
        key="withoutLayout"
        path={currentMenu && currentMenu.path}
        component={currentMenu && currentMenu.component}
        exact={!!currentMenu && currentMenu.exact}
      />
    )
  ]
}

export default GenuineLayout
