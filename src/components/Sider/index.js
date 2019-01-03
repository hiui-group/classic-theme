import React from 'react'
import classNames from 'classnames'
import Cookies from 'js-cookie'
import cloneDeep from 'lodash/cloneDeep'
import historyManager from '../../util/common'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    accordion: true,
    matchPath: ''
  }

  isSwitchToggle = false // toggle切换标识
  collapseCookie = '$$hiui-theme-collapse'

  constructor (props) {
    super(props)
    const items = cloneDeep(this.props.sider.items)
    const activeNav = this.getActiveValue(this.props.current, items) // 激活的导航所在位置
    const activeNavCache = activeNav.slice(0) // 缓存激活的导航所在位置，主要用于点击非链接项时子项的选中状态

    this.state = {
      items,
      showSub: true,
      collapse: false,
      activeNav,
      activeNavCache
    }
  }

  componentDidMount () {
    if (Cookies.get(this.collapseCookie) === 'true') {
      this.collapseToggle()
    }
  }

  componentWillReceiveProps (props) {
    const activeNav = this.getActiveValue(props.current, this.state.items)
    const activeNavCache = activeNav.slice(0)
    const items = cloneDeep(this.props.sider.items)
    this.setState({
      items,
      activeNav,
      activeNavCache
    })
  }

  getActiveValue (current, navs) { // 初始时获取激活导航的value
    let deep = 0
    let value = []
    const fn = iteration => {
      let flag = true // 用于终止后面的遍历
      iteration.every((nav, index) => {
        if (!nav.to && !nav.children) {
          return true
        }
        !nav.to && value.push(index)
        if (nav.to === current) {
          value.splice(deep, 1, index)
          flag = false
          return false
        }
        if (Array.isArray(nav.children)) {
          deep++
          flag = fn(nav.children)
          deep--
        }

        return flag
      })
      flag && value.pop()
      return flag
    }
    fn(navs)
    return value
  }

  checkExpanded (activeStatus, isLeaf, IS_EXPANDED = undefined, title) { // 检查导航项是否展开
    const {
      showSub,
      collapse
    } = this.state
    if (isLeaf || !showSub) { // 是叶子节点或者showSub=false
      return false
    }
    if (IS_EXPANDED !== undefined && !this.isSwitchToggle) { // 已判断过且不是切换toggle触发的
      return (activeStatus >= 0 || (!collapse && !this.props.accordion)) ? IS_EXPANDED : false
    }

    return activeStatus >= 0
  }

  arrayIndexOf (currentValue, values) { // 0代表激活当前项，-1未激活，1激活的是子项
    let flag = -1
    for (let index in values) {
      const value = values[index]
      let _flag = 0

      for (let i = 0; i < currentValue.length; i++) {
        if (currentValue[i] !== value[i]) {
          _flag = -1
          break
        }
      }
      if (_flag !== -1 && currentValue.length !== value.length) {
        _flag = 1
      }
      flag = _flag > flag ? _flag : flag
    }

    return flag
  }

  isLeaf (item) {
    return !Array.isArray(item.children)
  }

  clickNav (e, item, value) {
    e.stopPropagation()
    if (!item.to && !item.children) {
      return
    }
    let {
      collapse,
      showSub,
      activeNavCache
    } = this.state
    const isLeaf = this.isLeaf(item)
    if (isLeaf) {
      this.setState({
        activeNavCache: value,
        activeNav: value,
        showSub: collapse ? false : showSub // 收缩状态点击叶子节点，则隐藏2，3级项
      })
      const _h = historyManager.getHistory()
      if (_h.location.pathname !== item.to) {
        _h.replace(item.to)
      }
    } else {
      if (this.arrayIndexOf(value, [activeNavCache]) >= 0) { // 子选项已被选中
        value = activeNavCache
      }
      item.IS_EXPANDED = !item.IS_EXPANDED // 点击同一项则收缩
      const _state = {showSub: true}
      _state.activeNav = value
      this.setState(_state)
    }
  }

  collapseToggle () {
    const {
      collapse
    } = this.state
    const {
      changeCollapse
    } = this.props

    this.isSwitchToggle = true // 切换toggle标识
    Cookies.set(this.collapseCookie, !collapse)

    this.setState({
      collapse: !collapse,
      showSub: collapse
    }, () => {
      changeCollapse(!collapse)
      this.isSwitchToggle = false
    })
  }

  getActiveNavs (deep, isLeaf) {
    const {
      activeNavCache,
      activeNav
    } = this.state
    if (this.props.accordion) { // 手风琴模式
      return isLeaf || activeNav.length >= activeNavCache.length ? [activeNav, activeNavCache] : [activeNav]
    } else {
      return [activeNav, activeNavCache]
    }
  }

  renderNavs (items, cls) {
    let deep = -1
    const collapse = this.state.collapse
    // const activeNav = this.state.activeNav
    let navsContainer = []
    const render = (items, cls = '', currentValue = []) => {
      const navs = []
      let subNavs = []
      let subNavsValue = []
      ++deep
      items.map((item, index) => {
        if (!item.to && !item.children) {
          item.onlyTitle = true
        }
        currentValue.splice(deep, 1, index)
        const _currentValue = currentValue.slice(0)
        const isLeaf = this.isLeaf(item)
        const activeNavs = this.getActiveNavs(deep, isLeaf)
        const activeStatus = this.arrayIndexOf(currentValue, activeNavs)
        const isExpanded = this.checkExpanded(activeStatus, isLeaf, item.IS_EXPANDED, item.title)
        const expandIcon = isExpanded ? 'icon-up' : 'icon-down'

        item.IS_EXPANDED = isExpanded
        if (collapse && !isLeaf && isExpanded) { // 收缩状态用来记录次级展开项
          subNavs = item.children
          subNavsValue = currentValue.slice(0)
        }
        navs.push(
          <li
            key={index}
          >
            <div
              className={classNames(
                'sidebar__item',
                {'sidebar__item--active': (collapse || isLeaf) && activeStatus >= 0},
                {'sidebar__item--noaction': !item.to && !item.children}
              )}
              onClick={e => this.clickNav(e, item, _currentValue)}
            >
              {
                item.icon
                  ? (<span className='sidebar__item-icon'>{item.icon}</span>)
                  : ''
              }
              <span className={`sidebar__item-title`}>{item.title}</span>
              {
                !isLeaf && item.type !== 'title' &&
                <i className={classNames('sidebar__item-toggle', 'hi-icon', expandIcon)} />
              }
            </div>
            {
              !collapse && !isLeaf &&
              render(item.children, {'sidebar__list--submenu': true, 'sidebar__list--collapsed': !isExpanded}, currentValue)
            }
          </li>
        )
      })

      if (collapse) { // 收缩状态
        navsContainer.push((
          <div className={classNames('sidebar__wrapper', cls)} key={deep}>

            <ul className={classNames('sidebar__list')} key={deep}>
              {navs}
            </ul>
          </div>
        ))
        if (subNavs && subNavs.length > 0) { // 有次级选择项
          render(subNavs, 'sidebar__wrapper--submenu', subNavsValue)
        }

        return navsContainer
      } else {
        currentValue.pop()
        --deep

        return (
          <ul className={classNames('sidebar__list', cls)} key={deep}>
            {navs}
          </ul>
        )
      }
    }
    if (collapse) { // 收缩状态
      return render(items)
    } else {
      return (
        <div className='sidebar__wrapper'>
          {render(items)}
        </div>
      )
    }
  }

  render () {
    let {
      collapse,
      items
    } = this.state

    let {
      // sider,
      style,
      logo,
      extend
    } = this.props

    return (
      <aside className={`layout__sidebar sidebar ${collapse ? 'sidebar--collapsed' : ''}`} style={style}>
        {!collapse && logo}
        { this.renderNavs(items) }
        <div className='siderbar__extend'>
          {!collapse && extend}
        </div>
        <span
          className='sidebar__toggle'
          onClick={this.collapseToggle.bind(this)}
        />
      </aside>

    )
  }
}

export default Sider
