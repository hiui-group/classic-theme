import React from 'react'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import history from '../../util/history'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    accordion: true
  }

  constructor (props) {
    super(props)

    const activeNav = this.getActiveValue(this.props.current, this.props.navs) // 激活的导航所在位置
    const activeNavCache = activeNav.slice(0) // 缓存激活的导航所在位置，主要用于点击非链接项时子项的选中状态
    const filteredNavs = this.filterNavs(activeNav) // 过滤需要显示和激活的导航
    this.state = {
      collapse: false,
      activeNav,
      activeNavCache,
      filteredNavs
    }
  }

  componentWillReceiveProps (props) {
    const activeNav = this.getActiveValue(props.current, props.navs)
    const activeNavCache = activeNav.slice(0)
    const filteredNavs = this.filterNavs(activeNav, props.navs, true)
    this.setState({
      activeNav,
      activeNavCache,
      filteredNavs
    })
  }

  getActiveValue (current, navs) { // 初始时获取激活导航的value
    let deep = 0
    let value = []
    const fn = iteration => {
      let flag = true // 用于终止后面的遍历
      iteration.every((nav, index) => {
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

  filterNavs (activeNav, navs = this.props.navs, init = false) { // 过滤需要显示和激活的导航
    const _navs = cloneDeep(navs)
    const accordion = this.props.accordion
    let deep = 0
    const fn = (items, currentValue = []) => {
      items.map((item, index) => {
        currentValue.splice(deep, 1, index)
        const hasChildren = Array.isArray(item.children)
        const activeStatus = this.arrayIndexOf(currentValue, activeNav) // 0代表激活当前项，-1未激活，1激活的是子项
        // console.log('---------activeStatus', init, item.title, item.IS_EXPANDED, activeStatus)

        if (hasChildren) {
          ++deep
        }

        item.HAS_CHILDREN = hasChildren
        item.ACTIVE_STATUS = activeStatus
        item.VALUE = currentValue.slice(0)

        if (this.state && this.state.collapse) { // 收缩状态
          if (init) { // 点击收缩按钮，收起所有导航
            item.IS_EXPANDED = false
          } else if (item.HAS_CHILDREN && !item.IS_EXPANDED) { // 是否点击当前项
            item.IS_EXPANDED = activeStatus >= 0
          } else {
            item.IS_EXPANDED = false
          }
        } else {
          if (item.IS_EXPANDED) { // 已展开时需要判断是选中了子项还是折叠
            if (accordion) { // 手风琴模式
              item.IS_EXPANDED = activeStatus === 1
            } else {
              item.IS_EXPANDED = activeStatus !== 0
            }
          } else {
            item.IS_EXPANDED = activeStatus >= 0
          }
        }

        if (hasChildren) {
          fn(item.children, currentValue)
          currentValue.pop()
          --deep
        }
      })
    }

    fn(_navs)

    return _navs
  }

  arrayIndexOf (currentValue, value) { // 0代表激活当前项，-1未激活，1激活的是子项
    let flag = 0

    for (let i = 0; i < currentValue.length; i++) {
      if (currentValue[i] !== value[i]) {
        flag = -1
        break
      }
    }
    if (flag !== -1 && currentValue.length !== value.length) {
      flag = 1
    }

    return flag
  }

  clickNav (e, item) {
    e.stopPropagation()
    const {
      activeNavCache,
      filteredNavs
    } = this.state

    if (item.to) { // 点击链接
      this.setState({
        activeNav: item.VALUE,
        activeNavCache: item.VALUE
      }, () => {
        const _filteredNavs = this.filterNavs(item.VALUE, filteredNavs)
        this.setState({
          filteredNavs: _filteredNavs
        })
      })
      history.push(item.to)
    } else { // 点击展开或折叠子项
      let value = item.VALUE
      if (!item.IS_EXPANDED && this.arrayIndexOf(item.VALUE, activeNavCache) >= 0) { // 子选项已被选中
        value = activeNavCache
      }
      const _filteredNavs = this.filterNavs(value, filteredNavs)
      this.setState({
        filteredNavs: _filteredNavs,
        activeNav: item.VALUE
      })
    }
  }

  renderNavs (items, cls) {
    const navs = []
    const collapse = this.state.collapse

    items.map((item, index) => {
      const expandIcon = item.IS_EXPANDED ? 'icon-up' : 'icon-down'
      // console.log('----------renderNavs', item.HAS_CHILDREN, item.IS_EXPANDED, item.title)

      navs.push(
        <li
          key={index}
        >
          <div
            className={classNames('sidebar__item-link', 'sidebar__item', {'sidebar__item--active': (collapse || !item.HAS_CHILDREN) && item.ACTIVE_STATUS >= 0})}
            onClick={e => this.clickNav(e, item)}
          >
            {
              item.icon
                ? (<span className='sidebar__item-icon'>{item.icon}</span>)
                : ''
            }
            <span className='sidebar__item-title'>{item.title}</span>
            {
              item.HAS_CHILDREN &&
              <i className={classNames('sidebar__item-toggle', 'hi-icon', expandIcon)} />
            }
          </div>
          {
            item.HAS_CHILDREN && item.IS_EXPANDED && this.renderNavs(item.children, 'sidebar__list--subs')
          }
        </li>
      )
    })

    return (
      <ul className={classNames('sidebar__list', cls)}>
        {navs}
      </ul>
    )
  }

  render () {
    let {
      collapse,
      filteredNavs
    } = this.state

    let {
      changeCollapse,
      style
    } = this.props

    return (
      <aside className={`layout__sidebar sidebar ${collapse ? 'sidebar--collapsed' : ''}`} style={style}>
        <div className='sidebar__wrapper'>
          { this.renderNavs(filteredNavs) }
        </div>
        <span
          className='sidebar__toggle'
          onClick={e => {
            this.setState({collapse: !collapse}, () => {
              changeCollapse(!collapse)
              // showSubnavs(this.showSub)
            })
          }}
        />
      </aside>

    )
  }
}

export default Sider
