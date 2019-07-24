import React from 'react'
import Header from '../HeaderLayout'
import Sider from '../SiderLayout2'
import { Route } from 'react-router-dom'
import './index.scss'
class GeniueLayout extends React.Component {
  state = {
    activeSiderMenu: '',
    siderMenu: [],
    routes: []
  }

  componentDidMount () {
    const { menu, history, location } = this.props
    const siderMenu = this.getMenu(menu)
    const currentRoute = this.getCurrentRoute(siderMenu, location.pathname)
    const activeSiderMenu =
      (currentRoute && currentRoute.id) || this.getDefaultActiveSiderMenu(siderMenu)

    const routes = this.getRoutes(menu, [])
    this.setState({ siderMenu, activeSiderMenu, routes })
    const initNav = this.getInitNav(siderMenu, activeSiderMenu)
    history.push(initNav.pathname)
  }
  setSiderMenu = activeSiderMenu => {
    console.log('clickSiderMenu', activeSiderMenu)
    this.setState({ activeSiderMenu })
  }

  getMainMenu = menu => {
    return menu.map(m => {
      return {
        content: m.name,
        id: m.id,
        pathname: m.path || (m.children && m.children[0] && m.children[0].path) || ''
      }
    })
  }
  getMenu = menu => {
    return menu.map(m => {
      let _menu = {
        content: m.name,
        id: m.id
      }
      if (m.path) {
        _menu.pathname = m.path
      }
      if (m.children) {
        _menu.children = this.getMenu(m.children)
      }
      return _menu
    })
  }
  getCurrentRoute = (menu, pathname) => {
    let currentRoute
    menu.forEach(m => {
      if (m.pathname === pathname) {
        currentRoute = m
      } else if (m.children) {
        if (this.getCurrentRoute(m.children, pathname)) {
          currentRoute = this.getCurrentRoute(m.children, pathname)
        }
      }
    })
    if (currentRoute) {
      return currentRoute
    }
  }
  getInitNav = (menu, id) => {
    let initNav
    menu.forEach(m => {
      if (m.id === id) {
        initNav = m
      } else if (m.children) {
        if (this.getInitNav(m.children, id)) {
          initNav = this.getInitNav(m.children, id)
        }
      }
    })
    if (initNav) {
      return initNav
    }
  }
  getRoutes = (menu, routes = []) => {
    menu.forEach(item => {
      if (item.component) {
        routes.push(item)
      }
      if (item.children) {
        this.getRoutes(item.children, routes)
      }
    })
    return routes
  }
  getFirstChild = (arr, result = []) => {
    result.push(arr[0].id)
    if (arr[0].children) {
      this.getFirstChild(arr[0].children, result)
    }
    return result
  }
  getDefaultActiveSiderMenu = currentSiderMenu => {
    const activeSiders = this.getFirstChild(currentSiderMenu)
    return activeSiders[activeSiders.length - 1]
  }
  render () {
    const { activeSiderMenu, siderMenu, routes } = this.state
    const { location, history, apperance } = this.props
    return [
      <div key='container' className='hi-theme--geniue'>
        {siderMenu.length > 0 && (
          <Sider
            siderMenu={siderMenu}
            activeSiderMenu={activeSiderMenu}
            setSiderMenu={this.setSiderMenu}
            location={location}
            history={history}
            getInitNav={this.getInitNav}
          />
        )}
        <div className='hi-theme__container'>
          <Header setMainMenu={this.setMainMenu} location={location} history={history} />
          <div className='hi-theme__content'>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exact={!!route.exact}
              />
            ))}
          </div>
        </div>
      </div>
    ]
  }
}
export default GeniueLayout
