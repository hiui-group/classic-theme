import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import Footer from '../Footer'
import { Route } from 'react-router-dom'
import ClassNames from 'classnames'
import './style/index'
import { findMenu, getAncestor, getDefaultActiveMenu, getRoutes } from '../../util/common'

const filterMenu = (menu) => {
  return menu.filter((item) => {
    if (item.children) {
      item.children = (filterMenu(item.children).length > 0 && filterMenu(item.children)) || null
    }
    return item.name
  })
}

const GenuineLayout = ({
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
  footer,
  header
}) => {
  const currentMenu =
    findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)
  const selectedMenus = getAncestor(currentMenu.path, menu).reverse().concat(currentMenu)
  const _header = header === null || header || (
    <Header
      // setMainMenu={this.setMainMenu}
      location={location}
      history={history}
      color='light'
      // login={login}
      // mini={mini}
      toolbar={toolbar}
    />
  )
  const routes = getRoutes(menu)
  return [
    (!isWithoutLayout && (
      <div key='container' className='hi-theme--genuine'>
        {menu.length > 0 && (
          <Sider
            siderMenu={filterMenu(menu)}
            selectedMenus={selectedMenus}
            // setSiderMenu={this.setSiderMenu}
            location={location}
            history={history}
            // accordion={accordion}
            // getInitNav={this.getInitNav}
            // mini={mini}
            // miniToggle={this.miniToggle}
            // color={apperance.color}
            login={login}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            logo={logo}
          />
        )}
        <div className={ClassNames('hi-theme__container')}>
          {_header}
          <div className='hi-theme__wrapper'>
            <div
              className={ClassNames('hi-theme__content', {
                'hi-theme--no-header': header === null
              })}
            >
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  render={(props) => <route.component {...props} extraData={route.extraData} />}
                  exact={!!route.exact}
                />
              ))}
            </div>
            {footer && <Footer footer={footer} />}
          </div>
        </div>
      </div>
    )) || (
      <Route
        key='withoutLayout'
        path={currentMenu && currentMenu.path}
        component={currentMenu && currentMenu.component}
        exact={!!currentMenu && currentMenu.exact}
      />
    )
  ]
}

export default GenuineLayout
