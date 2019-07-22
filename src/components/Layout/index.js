import React from 'react'
import Header from '../HeaderLayout'
import Sider from '../SiderLayout2'
import { Route } from 'react-router-dom'
class Layout extends React.Component {
  state = {
    activeMainMenu: '',
    activeSiderMenu: '',
    mainMenu: [],
    siderMenu: [],
    routes: []
  }

  componentDidMount () {
    const { menu, history, location } = this.props
    const mainMenu = this.getMainMenu(menu)
    const currentLocation = mainMenu.find(item => item.pathname === location.pathname)
    const activeMainMenu = (currentLocation && currentLocation.id) || mainMenu[0].id
    const siderMenu = this.getSiderMenu(menu, activeMainMenu)
    const activeSiderMenu = this.getDefaultActiveSiderMenu(siderMenu)
    const routes = this.getRoutes(menu, [])
    this.setState({ mainMenu, activeMainMenu, siderMenu, activeSiderMenu, routes })
    const initNav = siderMenu.find(item => item.id === activeSiderMenu)
    history.push(initNav.pathname)
  }
  setMainMenu = activeMainMenu => {
    const siderMenu = this.getSiderMenu(this.props.menu, activeMainMenu)
    if (siderMenu.length) {
      const activeSiderMenu = this.getDefaultActiveSiderMenu(siderMenu)
      this.setState({ activeMainMenu, siderMenu, activeSiderMenu })
    } else {
      this.setState({ activeMainMenu, siderMenu })
    }
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
  getSiderMenu = (menu, activeMainMenu) => {
    const _activeMainMenu = menu.find(m => m.id === activeMainMenu)
    const siderMenu = (_activeMainMenu && _activeMainMenu.children) || []
    return siderMenu.map(m => {
      return {
        content: m.name,
        id: m.id,
        pathname: m.path
      }
    })
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
    const { activeMainMenu, activeSiderMenu, mainMenu, siderMenu, routes } = this.state
    const { location, history } = this.props
    return (
      <div>
        <Header
          mainMenu={mainMenu}
          activeMainMenu={activeMainMenu}
          setMainMenu={this.setMainMenu}
          location={location}
          history={history}
        />
        <div style={{ display: 'flex' }}>
          {siderMenu.length > 0 && (
            <Sider
              siderMenu={siderMenu}
              activeSiderMenu={activeSiderMenu}
              setSiderMenu={this.setSiderMenu}
              location={location}
              history={history}
            />
          )}
          <div>
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
    )
  }
}
export default Layout
