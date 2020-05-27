import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import './style/index'
import Footer from '../Footer'
import useMainMenu from '../../hooks/useMainMenu'
import { findMenu, getAncestor, getDefaultActiveMenu, getRoutes } from '../../util/common'

const ClassicLayout = ({
  menu,
  location,
  history,
  isWithoutLayout,
  logo,
  login,
  toolbar,
  fallback,
  siderTopRender,
  siderBottomRender,
  footer
}) => {
  const mainMenu = useMainMenu(menu)
  const currentMenu =
    findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)
  const selectedMenus = getAncestor(currentMenu.path, menu).reverse().concat(currentMenu)
  const activeMainMenu = selectedMenus[0]
  // TODO: siderMenu 需要过滤没有 name 的
  const siderMenu = selectedMenus[0].children || []
  const routes = getRoutes(menu)
  return [
    !isWithoutLayout && (
      <Header
        key='header'
        mainMenu={mainMenu}
        activeMainMenu={activeMainMenu}
        // setMainMenu={this.setMainMenu}
        location={location}
        history={history}
        logo={logo}
        login={login}
        toolbar={toolbar}
      />
    ),
    (!isWithoutLayout && (
      <div key='container' className='hi-theme--classic'>
        {siderMenu.length > 0 && (
          <Sider
            siderMenu={siderMenu}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            selectedMenus={selectedMenus}
            // setSiderMenu={this.setSiderMenu}
            location={location}
            history={history}
            // getInitNav={this.getInitNav}
            // mini={mini}
            // miniToggle={this.miniToggle}
            color='light'
            // accordion={accordion}
          />
        )}
        <div className='hi-theme__wrapper'>
          <div className='hi-theme__content'>
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
