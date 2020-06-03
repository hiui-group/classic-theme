import React, {useState, useEffect, useCallback} from 'react'
import Header from '../Header'
import Sider from '../Sider'
import Footer from '../Footer'
import { Route } from 'react-router-dom'
import ClassNames from 'classnames'
import './style/index'
import { getRoutes } from '../../util/common'
import useMenuCalculator from '../../hooks/useMenuCalculator'

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
  const {currentMenu, selectedMenus, onSelectMenu} = useMenuCalculator(menu, location, fallback)

  const _header = header === null || header || (
    <Header
      location={location}
      history={history}
      color='light'
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
            onSelectMenu={onSelectMenu}
            // accordion={accordion}
            // getInitNav={this.getInitNav}
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
