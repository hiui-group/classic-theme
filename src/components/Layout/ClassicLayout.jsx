import React, { useMemo } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import './style/index'
import Footer from '../Footer'
import useMainMenu from '../../hooks/useMainMenu'
import { getRoutes, filterMenu } from '../../util/common'
import useMenuCalculator from '../../hooks/useMenuCalculator'

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
  pageHeader
}) => {
  const mainMenu = useMainMenu(menu)
  const { currentMenu, selectedMenus, onSelectMenu } = useMenuCalculator(menu, { location, history }, fallback)
  const isWithoutLayout = currentMenu && currentMenu.withoutLayout
  const activeMainMenu = selectedMenus[0]
  const siderMenu = (selectedMenus[0] && selectedMenus[0].children) || []
  const routes = getRoutes(menu)
  const _siderMenu = useMemo(() => {
    return filterMenu(siderMenu)
  }, [siderMenu])
  return [
    !isWithoutLayout && (
      <Header
        key='header'
        mainMenu={mainMenu}
        activeMainMenu={activeMainMenu}
        location={location}
        logo={logo}
        login={login}
        toolbar={toolbar}
      />
    ),
    (!isWithoutLayout && (
      <div key='container' className='hi-theme--classic'>
        {siderMenu.length > 0 && (
          <Sider
            siderMenu={_siderMenu}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            selectedMenus={selectedMenus}
            onSelectMenu={onSelectMenu}
            defaultExpandAll={defaultExpandAll}
            accordion={accordion}
          />
        )}
        <div className='hi-theme__wrapper'>
          {pageHeader ? pageHeader(selectedMenus, location) : null}
          <div
            className='hi-theme__content'
            style={{ padding: apperance.contentPadding, background: apperance.contentBackground }}
          >
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={!!route.exact}
                render={(props) => <route.component {...props} extraData={route.extraData} />}
              />
            ))}
          </div>
          {footer && <Footer footer={footer} />}
        </div>
      </div>
    )) || (
      <Route
        key='withoutLayout'
        path={currentMenu.path}
        component={currentMenu.component}
        exact={!!currentMenu.exact}
      />
    )
  ]
}

export default ClassicLayout
