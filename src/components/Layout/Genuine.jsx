import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { Route } from 'react-router-dom'
import { matchPath } from 'react-router'
import _ from 'lodash'
import ClassNames from 'classnames'
import './style/index'
class GenuineLayout extends React.Component {
  state = {
    activeSiderMenu: '',
    siderMenu: [],
    filtedSiderMenu: [],
    routes: [],
    mini: false
  }

  componentDidMount() {
    const { menu, history, location } = this.props
    this.handleMenuChange(location, menu, history)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { location, menu } = nextProps
      const siderMenu = this.getMenu(menu)
      const _siderMenu = this.getMenu(menu)

      const filtedSiderMenu = this.filterMenu(siderMenu)

      const currentRoute = this.getCurrentRoute(_siderMenu, location.pathname)
      const _currentMenu = this.getCurrentRoute(filtedSiderMenu, location.pathname)
      const activeSiderMenu =
        (_currentMenu && _currentMenu.id) ||
        (currentRoute &&
          currentRoute.id &&
          this.getParent(location.pathname, _siderMenu) &&
          this.getParent(location.pathname, _siderMenu).id) ||
        this.getDefaultActiveSiderMenu(siderMenu)
      const routes = this.getRoutes(menu, [])
      this.setState({ siderMenu, activeSiderMenu, routes, filtedSiderMenu })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.menu, this.props.menu)) {
      const { menu, history, location } = this.props
      this.handleMenuChange(location, menu, history)
    }
  }
  handleMenuChange = (location, menu, history) => {
    const siderMenu = this.getMenu(menu)
    const _siderMenu = this.getMenu(menu)

    const filtedSiderMenu = this.filterMenu(siderMenu)

    const currentRoute = this.getCurrentRoute(_siderMenu, location.pathname)
    const _currentMenu = this.getCurrentRoute(filtedSiderMenu, location.pathname)
    const activeSiderMenu =
      (_currentMenu && _currentMenu.id) ||
      (currentRoute &&
        currentRoute.id &&
        this.getParent(location.pathname, _siderMenu) &&
        this.getParent(location.pathname, _siderMenu).id) ||
      this.getDefaultActiveSiderMenu(siderMenu)
    const routes = this.getRoutes(menu, [])
    this.setState({ siderMenu, activeSiderMenu, routes, filtedSiderMenu })
    if (!currentRoute) {
      const initNav = this.getInitNav(siderMenu, activeSiderMenu)
      history.push(initNav.pathname)
    } else {
      history.push(location.pathname)
    }
  }
  setSiderMenu = (activeSiderMenu) => {
    this.setState({ activeSiderMenu })
  }

  // 进行 menu 格式转化
  getMenu = (menu) => {
    return menu.map((m) => {
      let _menu = {
        content: m.name,
        id: m.id,
        icon: m.icon,
        target: m.target,
        component: m.component
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

  // 过虑有 content 值的项
  filterMenu = (menu) => {
    return menu.filter((item) => {
      if (item.children) {
        item.children = this.filterMenu(item.children)
      }
      return item.content
    })
  }
  getCurrentRoute = (menu, pathname) => {
    let currentRoute
    menu.forEach((m) => {
      if (
        m.pathname === pathname ||
        m.path === pathname ||
        matchPath(pathname, {
          path: m.pathname || m.path,
          exact: true
        })
      ) {
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
  getFirstChild = (arr, result = []) => {
    result.push(arr[0].id)
    if (arr[0].children) {
      this.getFirstChild(arr[0].children, result)
    }
    return result
  }
  // 寻找某一节点的父节点
  getParent = (path, data) => {
    let parent
    data.forEach((item) => {
      if (item.children) {
        if (
          item.children.some(
            (child) =>
              child.pathname === path ||
              matchPath(path, {
                path: child.pathname,
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
  getDefaultActiveSiderMenu = (currentSiderMenu) => {
    const activeSiders = this.getFirstChild(currentSiderMenu)
    return activeSiders[activeSiders.length - 1]
  }
  miniToggle = () => {
    this.setState({ mini: !this.state.mini })
  }
  render() {
    const { activeSiderMenu, siderMenu, routes, mini, filtedSiderMenu } = this.state
    const {
      location,
      history,
      apperance,
      logo,
      login,
      header,
      toolbar,
      siderTopRender,
      siderBottomRender,
      accordion
    } = this.props
    const currentRoute = this.getCurrentRoute(routes, location.pathname)
    const isWithoutLayout = currentRoute && currentRoute.withoutLayout
    const _header = header === null || header || (
      <Header
        setMainMenu={this.setMainMenu}
        location={location}
        history={history}
        color='light'
        login={login}
        mini={mini}
        toolbar={toolbar}
      />
    )
    return [
      (!isWithoutLayout && (
        <div key='container' className='hi-theme--genuine'>
          {siderMenu.length > 0 && (
            <Sider
              siderMenu={filtedSiderMenu}
              activeSiderMenu={activeSiderMenu}
              setSiderMenu={this.setSiderMenu}
              location={location}
              history={history}
              accordion={accordion}
              getInitNav={this.getInitNav}
              mini={mini}
              miniToggle={this.miniToggle}
              color={apperance.color}
              siderTopRender={siderTopRender}
              siderBottomRender={siderBottomRender}
              logo={logo}
            />
          )}
          <div className={ClassNames('hi-theme__container')}>
            {_header}
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
export default GenuineLayout
