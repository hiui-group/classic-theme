import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import './style/index'
class ClassicLayout extends React.Component {
  state = {
    activeMainMenu: '',
    activeSiderMenu: '',
    mainMenu: [],
    siderMenu: [],
    routes: [],
    mini: false
  }

  componentDidMount () {
    const { menu, history, location } = this.props
    const mainMenu = this.getMainMenu(menu)
    const currentLocation = mainMenu.find(item => item.pathname === location.pathname)
    const activeMainMenu = (currentLocation && currentLocation.id) || mainMenu[0].id
    const siderMenu = this.getSiderMenu(menu, activeMainMenu)

    const activeSiderMenu = siderMenu.length ? this.getDefaultActiveSiderMenu(siderMenu) : ''
    const routes = this.getRoutes(menu, [])
    this.setState({
      mainMenu,
      activeMainMenu,
      siderMenu,
      activeSiderMenu,
      routes
    })
    const initNav = siderMenu.length
      ? this.getInitNav(siderMenu, activeSiderMenu)
      : mainMenu[0].pathname
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
    this.setState({ activeSiderMenu })
  }

  getMainMenu = menu => {
    return menu.map(m => {
      return {
        content: m.name,
        id: m.id,
        icon: m.icon,
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
        icon: m.icon,
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
  miniToggle = () => {
    this.setState({ mini: !this.state.mini })
  }
  render () {
    const { activeMainMenu, activeSiderMenu, mainMenu, siderMenu, routes, mini } = this.state
    const { location, history, apperance, logo, login } = this.props
    return [
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
      />,
      <div key='container' className='hi-theme--classic'>
        {siderMenu.length > 0 && (
          <Sider
            siderMenu={siderMenu}
            activeSiderMenu={activeSiderMenu}
            setSiderMenu={this.setSiderMenu}
            location={location}
            history={history}
            getInitNav={this.getInitNav}
            mini={mini}
            miniToggle={this.miniToggle}
            color='light'
          />
        )}
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
    ]
  }
}
export default ClassicLayout
