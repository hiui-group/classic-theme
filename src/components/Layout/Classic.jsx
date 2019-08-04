import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import { matchPath } from 'react-router'
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
    const currentMenu = this.findMenu(location.pathname, menu)
    const ancestor = this.getAncestor(location.pathname, menu).reverse()
    const mainMenu = this.getMainMenu(menu)
    const activeMainMenu =
      (ancestor[0] && ancestor[0].id) ||
      (currentMenu && currentMenu.id) ||
      mainMenu[0].id
    const siderMenu = this.getSiderMenu(menu, activeMainMenu)

    const activeSiderMenu = siderMenu.length
      ? (this.findMenu(location.pathname, siderMenu) &&
          this.findMenu(location.pathname, siderMenu).id) ||
        this.getDefaultActiveSiderMenu(siderMenu)
      : ''
    const routes = this.getRoutes(menu, [])
    this.setState({
      mainMenu,
      activeMainMenu,
      siderMenu,
      activeSiderMenu,
      routes
    })
    if (!currentMenu) {
      const initNav = siderMenu.length
        ? this.getInitNav(siderMenu, activeSiderMenu).pathname
        : mainMenu.find(item => item.id === activeMainMenu).pathname
      history.push(initNav)
    }
  }

  // 寻找某一节点的所有祖先节点
  getAncestor = (path, data, arr = []) => {
    if (this.getParent(path, data)) {
      arr.push(this.getParent(path, data))
      this.getAncestor(this.getParent(path, data), data, arr)
    }
    return arr
  }

  findMenu = (path, data) => {
    let node
    data.forEach((d, index) => {
      if (
        d.pathname === path ||
        d.path === path ||
        matchPath(path, {
          path: d.path || d.pathname,
          exact: true
        })
      ) {
        node = d
      } else {
        if (d.children && this.findMenu(path, d.children)) {
          node = this.findMenu(path, d.children)
        }
      }
    })
    return node
  }
  // 寻找某一节点的父节点
  getParent = (path, data) => {
    let parent
    data.forEach(item => {
      if (item.children) {
        if (
          item.children.some(
            item =>
              item.path === path ||
              matchPath(path, {
                path: item.path,
                exact: true
              })
          )
        ) {
          parent = item
        } else if (this.getParent(path, item.children)) {
          parent = this.getParent(path, item.children)
        }
      }
    })
    return parent
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
        pathname:
          m.path || (m.children && m.children[0] && m.children[0].path) || ''
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
    const {
      activeMainMenu,
      activeSiderMenu,
      mainMenu,
      siderMenu,
      routes,
      mini
    } = this.state
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
