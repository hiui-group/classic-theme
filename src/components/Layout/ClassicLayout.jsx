import React, { useCallback } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import _ from 'lodash'
import './style/index'
import Footer from '../Footer'
import useMainMenu from '../../hooks/useMainMenu'

const ClassicLayout = ({ menu, location, history, isWithoutLayout, logo, login, toolbar }) => {
  const mainMenu = useMainMenu(menu)
  return [
    !isWithoutLayout && (
      <Header
        key='header'
        mainMenu={mainMenu}
        activeMainMenu={activeMainMenu}
        setMainMenu={this.setMainMenu}
        location={location}
        history={history}
        color={apperance.color}
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
            activeSiderMenu={activeSiderMenu}
            setSiderMenu={this.setSiderMenu}
            location={location}
            history={history}
            getInitNav={this.getInitNav}
            mini={mini}
            miniToggle={this.miniToggle}
            color='light'
            accordion={accordion}
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
        path={currentRoute && currentRoute.path}
        component={currentRoute && currentRoute.component}
        exact={!!currentRoute && currentRoute.exact}
      />
    )
  ]
}

export default ClassicLayout
