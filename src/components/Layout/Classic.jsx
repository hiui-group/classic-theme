import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import { matchPath } from 'react-router'
import _ from 'lodash'
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
    this.handleMenuChange(location, menu, history)
  }
  handleMenuChange = (location, menu, history) => {
    const currentMenu = this.findMenu(location.pathname, menu)
    const ancestor = this.getAncestor(location.pathname, menu).reverse()
    const mainMenu = this.getMainMenu(menu)
    const activeMainMenuItem = ancestor[0] || currentMenu || mainMenu[0]
    const activeMainMenu = activeMainMenuItem.id
    const siderMenu = this.getSiderMenu(menu, activeMainMenu)
    // 左侧菜单高亮逻辑：侧边栏能找到优先侧边栏，侧边栏找不到(主要是详情页的情况)，看其父层级在不在侧边栏，最后取默认第一个
    const activeSiderMenu =
      (currentMenu && currentMenu.id) ||
      (siderMenu.length
        ? (this.findMenu(location.pathname, siderMenu) &&
            this.findMenu(location.pathname, siderMenu).id) ||
          (ancestor.length > 1 && ancestor[ancestor.length - 1].id) ||
          (activeMainMenuItem.component && activeMainMenuItem.id) ||
          this.getDefaultActiveSiderMenu(siderMenu)
        : '')
    const routes = this.getRoutes(menu, [])
    this.setState({
      mainMenu,
      activeMainMenu,
      siderMenu,
      activeSiderMenu,
      routes
    })
    if (!currentMenu) {
      const initNav =
        mainMenu.find((item) => item.id === activeMainMenu).pathname ||
        (this.getInitNav(siderMenu, activeSiderMenu) &&
          this.getInitNav(siderMenu, activeSiderMenu).pathname)
      history.push(initNav)
    } else {
      history.push(location.pathname)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { location, menu } = nextProps
      const currentMenu = this.findMenu(location.pathname, menu)
      const ancestor = this.getAncestor(location.pathname, menu).reverse()

      const mainMenu = this.getMainMenu(menu)
      const activeMainMenuItem = ancestor[0] || currentMenu || mainMenu[0]
      const activeMainMenu = activeMainMenuItem.id
      const siderMenu = this.getSiderMenu(menu, activeMainMenu)

      const activeSiderMenu =
        (currentMenu && currentMenu.id) ||
        (siderMenu.length
          ? (this.findMenu(location.pathname, siderMenu) &&
              this.findMenu(location.pathname, siderMenu).id) ||
            (ancestor.length > 1 && ancestor[ancestor.length - 1].id) ||
            (activeMainMenuItem.component && activeMainMenuItem.id) ||
            this.getDefaultActiveSiderMenu(siderMenu, siderMenu)
          : '')
      const routes = this.getRoutes(menu, [])
      this.setState({
        mainMenu,
        activeMainMenu,
        siderMenu,
        activeSiderMenu,
        routes
      })
      if (!currentMenu) {
        const initNav =
          mainMenu.find((item) => item.id === activeMainMenu).pathname ||
          (this.getInitNav(siderMenu, activeSiderMenu) &&
            this.getInitNav(siderMenu, activeSiderMenu).pathname)
        this.props.history.push(initNav)
      } else {
        this.props.history.push(location.pathname)
      }
    }
  }
  componentDidUpdate (prevProps, prevState) {
    const { menu, history, location } = this.props
    if (!_.isEqual(prevProps.menu, this.props.menu)) {
      this.handleMenuChange(location, menu, history)
    }
  }

  // 寻找某一节点的所有祖先节点
  getAncestor = (path, data, arr = []) => {
    if (this.getParent(path, data)) {
      const parent = this.getParent(path, data)
      arr.push(parent)
      this.getAncestor(parent.path || parent.id, data, arr)
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
    data.forEach((item) => {
      if (item.children) {
        if (
          item.children.some(
            (child) =>
              child.path === path ||
              matchPath(path, {
                path: child.path,
                exact: true
              }) ||
              child.id === path
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
  setMainMenu = (activeMainMenu, mainMenuComp) => {
    const siderMenu = this.getSiderMenu(this.props.menu, activeMainMenu)
    if (siderMenu.length && !mainMenuComp) {
      const activeSiderMenu = this.getDefaultActiveSiderMenu(siderMenu)
      this.setState({ activeMainMenu, siderMenu, activeSiderMenu })
    } else {
      this.setState({ activeMainMenu, siderMenu })
    }
  }
  setSiderMenu = (activeSiderMenu) => {
    this.setState({ activeSiderMenu })
  }

  getMainMenu = (menu) => {
    return menu.map((m) => {
      return {
        content: m.name,
        id: m.id,
        icon: m.icon,
        target: m.target,
        pathname: this.getMainMenuPath(m) || '',
        component: m.component
      }
    })
  }
  getSiderMenu = (menu, activeMainMenu) => {
    const _activeMainMenu = menu.find((m) => m.id === activeMainMenu)
    const siderMenu = (_activeMainMenu && _activeMainMenu.children) || []
    return this.transformMenu(siderMenu)
  }
  transformMenu = (menu) => {
    return menu
      .map((m) => {
        return m.children
          ? {
            content: m.name,
            id: m.id,
            icon: m.icon,
            target: m.target,
            children:
                (this.transformMenu(m.children).length > 0 && this.transformMenu(m.children)) ||
                null,
            pathname: m.path,
            component: m.component
          }
          : {
            content: m.name,
            id: m.id,
            icon: m.icon,
            pathname: m.path,
            target: m.target
          }
      })
      .filter((item) => item.content)
  }
  getRoutes = (menu, routes = []) => {
    menu.forEach((item) => {
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
    menu.forEach((m) => {
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
    if (arr[0].pathname || arr[0].path) {
      return result
    }
    if (arr[0].children) {
      this.getFirstChild(arr[0].children, result)
    }
    return result
  }
  getMainMenuPath = (menu) => {
    if (menu.path) {
      return menu.path
    } else if (menu.children) {
      return this.getMainMenuPath(menu.children[0])
    }
  }
  getDefaultActiveSiderMenu = (currentSiderMenu) => {
    const activeSiders = this.getFirstChild(currentSiderMenu)
    return activeSiders[activeSiders.length - 1]
  }
  miniToggle = () => {
    this.setState({ mini: !this.state.mini })
  }
  render () {
    const { activeMainMenu, activeSiderMenu, mainMenu, siderMenu, routes, mini } = this.state

    const {
      location,
      history,
      apperance,
      logo,
      login,
      toolbar,
      siderTopRender,
      siderBottomRender,
      accordion
    } = this.props
    const currentRoute = this.findMenu(location.pathname, routes)
    const isWithoutLayout = currentRoute && currentRoute.withoutLayout
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
}
export default ClassicLayout
