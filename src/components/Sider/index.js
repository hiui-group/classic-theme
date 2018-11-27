import React from 'react'
import classNames from 'classnames'
import history from '../../util/history'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    accordion: true
  }

  isSwitchToggle = false // toggle切换标识

  constructor (props) {
    super(props)

    const activeNav = this.getActiveValue(this.props.current, this.props.navs) // 激活的导航所在位置
    const activeNavCache = activeNav.slice(0) // 缓存激活的导航所在位置，主要用于点击非链接项时子项的选中状态
    this.state = {
      showSub: true,
      collapse: false,
      activeNav,
      activeNavCache
    }
  }

  componentWillReceiveProps (props) {
    const activeNav = this.getActiveValue(props.current, props.navs)
    const activeNavCache = activeNav.slice(0)
    this.setState({
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

  checkExpanded (activeStatus, isLeaf, IS_EXPANDED = undefined) {
    if (isLeaf || !this.state.showSub) {
      return false
    }
    if (IS_EXPANDED !== undefined && !this.isSwitchToggle) {
      return activeStatus >= 0 || !this.props.accordion ? IS_EXPANDED : false
    }

    return activeStatus >= 0
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

  isLeaf (item) {
    return !Array.isArray(item.children)
  }

  clickNav (e, item, value) {
    e.stopPropagation()
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
        showSub: collapse ? false : showSub
      })
      history.push(item.to)
    } else {
      if (this.arrayIndexOf(value, activeNavCache) >= 0) { // 子选项已被选中
        value = activeNavCache
      }
      item.IS_EXPANDED = !item.IS_EXPANDED

      this.setState({
        activeNav: value,
        showSub: true
      })
    }
  }

  renderNavs (items, cls) {
    let deep = -1
    const collapse = this.state.collapse
    const activeNav = this.state.activeNav
    let navsContainer = []

    const render = (items, cls = '', currentValue = []) => {
      const navs = []
      let subNavs = []
      let subNavsValue = []
      ++deep

      items.map((item, index) => {
        currentValue.splice(deep, 1, index)
        const _currentValue = currentValue.slice(0)
        const isLeaf = this.isLeaf(item)
        const activeStatus = this.arrayIndexOf(currentValue, activeNav)
        const isExpanded = this.checkExpanded(activeStatus, isLeaf, item.IS_EXPANDED)
        console.log('----------renderNavs', activeStatus, currentValue, item.title, isExpanded, item.IS_EXPANDED)
        const expandIcon = isExpanded ? 'icon-up' : 'icon-down'
        item.IS_EXPANDED = isExpanded

        if (collapse && !isLeaf && isExpanded) {
          subNavs = item.children
          subNavsValue = currentValue.slice(0)
        }

        navs.push(
          <li
            key={index}
          >
            <div
              className={classNames('sidebar__item-link', 'sidebar__item', {'sidebar__item--active': (collapse || isLeaf) && activeStatus >= 0})}
              onClick={e => this.clickNav(e, item, _currentValue)}
            >
              {
                item.icon
                  ? (<span className='sidebar__item-icon'>{item.icon}</span>)
                  : ''
              }
              <span className='sidebar__item-title'>{item.title}</span>
              {
                !isLeaf &&
                <i className={classNames('sidebar__item-toggle', 'hi-icon', expandIcon)} />
              }
            </div>
            {
              !collapse && !isLeaf &&
              render(item.children, {'sidebar__list--subs': true, 'sidebar__list--collapse': !isExpanded}, currentValue)
            }
          </li>
        )
      })

      if (collapse) {
        navsContainer.push((
          <div className={classNames('sidebar__wrapper', cls)} key={deep}>
            <ul className={classNames('sidebar__list')} key={deep}>
              {navs}
            </ul>
          </div>
        ))
        if (subNavs && subNavs.length > 0) {
          render(subNavs, 'sidebar__wrapper--subs', subNavsValue)
        }
        // currentValue.pop()
        // --deep
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

    if (collapse) {
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
      collapse
    } = this.state

    let {
      changeCollapse,
      navs,
      style
    } = this.props

    return (
      <aside className={`layout__sidebar sidebar ${collapse ? 'sidebar--collapsed' : ''}`} style={style}>
        { this.renderNavs(navs) }
        <span
          className='sidebar__toggle'
          onClick={e => {
            this.isSwitchToggle = true

            this.setState({
              collapse: !collapse,
              showSub: collapse
            }, () => {
              changeCollapse(!collapse)
              this.isSwitchToggle = true
              // showSubnavs(this.showSub)
            })
          }}
        />
      </aside>

    )
  }
}

export default Sider
