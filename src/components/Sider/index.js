import React from 'react'
import classNames from 'classnames'
import history from '../../util/history'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    accordion: true
  }

  LOCK = false

  constructor (props) {
    super(props)

    const activeNav = this.getActiveValue(this.props.current, this.props.navs) // 激活的导航所在位置
    const activeNavCache = activeNav.slice(0) // 缓存激活的导航所在位置，主要用于点击非链接项时子项的选中状态
    const filteredNavs = this.filterNavs(activeNav) // 过滤需要显示和激活的导航
    this.state = {
      ctrls: {},
      collapse: false,
      activeNav,
      activeNavCache,
      filteredNavs,
      showSub: false
    }
  }

  componentWillReceiveProps (props) {
    const activeNav = this.getActiveValue(props.current, props.navs)
    const activeNavCache = activeNav.slice(0)
    const filteredNavs = this.filterNavs(activeNav)
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

  filterNavs (activeNav, navs = this.props.navs) { // 过滤需要显示和激活的导航
    const _navs = navs.slice(0)
    const accordion = this.props.accordion
    let deep = 0
    const fn = (items, currentValue = []) => {
      items.map((item, index) => {
        currentValue.splice(deep, 1, index)
        const hasChildren = Array.isArray(item.children)
        const activeStatus = this.arrayIndexOf(currentValue, activeNav) // 0代表激活当前项，-1未激活，1激活的是子项
        // console.log('---------activeStatus', deep, activeStatus, currentValue, item.title)

        if (hasChildren && activeStatus >= 0) {
          ++deep
        }

        item.HAS_CHILDREN = hasChildren
        item.ACTIVE_STATUS = activeStatus
        item.VALUE = currentValue.slice(0)
        if (item.IS_EXPANDED) { // 已展开时需要判断是选中了子项还是折叠
          if (accordion) { // 手风琴模式
            item.IS_EXPANDED = activeStatus === 1
          } else {
            item.IS_EXPANDED = activeStatus !== 0
          }
        } else {
          item.IS_EXPANDED = activeStatus >= 0
        }

        if (hasChildren && activeStatus >= 0) {
          fn(item.children, currentValue)
          currentValue.pop()
          --deep
        }
      })
    }

    fn(_navs)

    return _navs
  }

  toggleSlide (el, isClose, func, lock) {
    if (!isClose) {
      el.style.display = 'block'
      el.style.height = 0
    }
    const maxDelay = 300
    const height = el.scrollHeight
    const speed = Math.max(height / maxDelay, 0.5)
    let sum = 0
    let start = null
    const animate = timestamp => {
      if (!start) start = timestamp
      const progress = timestamp - start
      sum = progress * speed
      el.style.height = `${isClose ? height - sum : sum}px`
      if (height < sum) {
        if (isClose) {
          el.style.display = 'none'
        }
        el.style.height = ''
        func && func()
        lock && (this.LOCK = false)
      } else {
        window.requestAnimationFrame(animate)
      }
    }
    window.requestAnimationFrame(animate)
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
    if (item.to) { // 点击展开或折叠子项
      this.setState({
        activeNav: item.VALUE,
        activeNavCache: item.VALUE
      }, () => {
        const filteredNavs = this.filterNavs(item.VALUE)
        this.setState({
          filteredNavs
        })
      })
      history.push(item.to)
    } else { // 点击链接
      let value = item.VALUE
      if (!item.IS_EXPANDED && this.arrayIndexOf(item.VALUE, this.state.activeNavCache) >= 0) { // 子选项已被选中
        value = this.state.activeNavCache
      }
      const filteredNavs = this.filterNavs(value)
      this.setState({
        filteredNavs,
        activeNav: item.VALUE
      })
    }
  }

  renderNavs (items) {
    const navs = []
    items.map((item, index) => {
      const expandIcon = item.IS_EXPANDED ? 'icon-up' : 'icon-down'
      // console.log('-----------renderNavs', item.title)

      navs.push(
        <li
          key={index}
        >
          <div
            className={classNames('sidebar__item-link', 'sidebar__item', {'sidebar__item--active': !item.HAS_CHILDREN && item.ACTIVE_STATUS === 0})}
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
            item.HAS_CHILDREN && item.IS_EXPANDED && this.renderNavs(item.children)
          }
        </li>
      )
    })

    return (
      <ul className='sidebar__list'>
        {navs}
      </ul>
    )
  }

  render () {
    let {
      collapse,
      showSub,
      filteredNavs
    } = this.state

    let {
      changeCollapse,
      showSubnavs,
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
            if (collapse) {
              showSub = false
            }

            const ctrls = {}

            this.setState({collapse: !collapse, showSub, ctrls})
            changeCollapse(!collapse)
            showSubnavs(showSub)
          }}
        />
      </aside>

    )
  }
}

export default Sider
