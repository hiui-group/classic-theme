import React, { useMemo } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import Footer from '../Footer'
import { Route } from 'react-router-dom'
import ClassNames from 'classnames'
import './style/index'
import { getRoutes, filterMenu } from '../../util/common'
import useMenuCalculator from '../../hooks/useMenuCalculator'

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
  accordion
}) => {
  const { currentMenu, selectedMenus, onSelectMenu } = useMenuCalculator(menu, { location, history }, fallback)
  const isWithoutLayout = currentMenu && currentMenu.withoutLayout
  const _header = header === null || header || <Header toolbar={toolbar} />
  const routes = getRoutes(menu)
  const _siderMenu = useMemo(() => {
    return filterMenu(menu)
  }, [menu])
  return [
    (!isWithoutLayout && (
      <div key='container' className='hi-theme--genuine'>
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
          />
        )}
        <div className={ClassNames('hi-theme__container')}>
          {_header}
          <div className='hi-theme__wrapper'>
            <div
              className={ClassNames('hi-theme__content', {
                'hi-theme--no-header': header === null
              })}
              style={{ padding: apperance.contentPadding, background: apperance.contentBackground }}
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
