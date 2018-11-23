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

    const activeNavCache = this.getActiveValue(this.props.current, this.props.navs)
    console.log('----------activeNavCache', activeNavCache)
    const activeNav = activeNavCache.slice()
    const filteredNavs = this.filterNavs(activeNav)

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
    console.log('-------componentWillReceiveProps')
    if (props.current !== this.props.current) {
      // const current = this.getActiveValue(this.props.current)
    }
  }

  componentDidMount () {
  }

  getActiveValue (current, navs) {
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
        } else {
          value.pop()
        }

        return flag
      })
      deep--
    }
    fn(navs.slice())

    return value
  }

  filterNavs (activeNav, navs = this.props.navs) {
    const _navs = navs.slice()
    let deep = 0
    const fn = (items, currentValue = []) => {
      items.slice().map((item, index) => {
        currentValue.splice(deep, 1, index)
        const hasChildren = Array.isArray(item.children)
        const activeStatus = this.arrayIndexOf(currentValue, activeNav) // 0代表激活当前项，-1未激活，1激活的是子项
        // console.log('---------activeStatus', deep, activeStatus, currentValue, item.title)

        if (hasChildren && activeStatus >= 0) {
          ++deep
        }

        item.HAS_CHILDREN = hasChildren
        item.ACTIVE_STATUS = activeStatus
        item.VALUE = currentValue.slice()
        if (item.IS_EXPANDED) {
          item.IS_EXPANDED = activeStatus === 1
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
    console.log('--------_navs', _navs)

    return _navs
  }

  getClickElement (dom) {
    if (dom.nodeName === 'SPAN' && [].slice.call(dom.classList).indexOf('sidebar__item') > -1) {
      return dom.nextSibling
    } else {
      const parent = dom.parentNode
      return this.getClickElement(parent)
    }
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

  renderNavs (items) {
    const navs = []
    items.slice().map((item, index) => {
      const hasChildren = item.HAS_CHILDREN
      const activeStatus = item.ACTIVE_STATUS
      const isExpanded = item.IS_EXPANDED
      const expandIcon = isExpanded ? 'icon-up' : 'icon-down'
      // console.log('-----------renderNavs', item.title)

      navs.push(
        <li
          key={index}
        >
          <div
            className={classNames('sidebar__item-link', 'sidebar__item', {'sidebar__item--active': activeStatus === 0})}
            onClick={e => {
              e.stopPropagation()
              if (item.to) {
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
              } else {
                let value = item.VALUE
                if (!isExpanded && this.arrayIndexOf(item.VALUE, this.state.activeNavCache) >= 0) {
                  value = this.state.activeNavCache
                }
                const filteredNavs = this.filterNavs(value)
                this.setState({
                  filteredNavs,
                  activeNav: item.VALUE
                })
                console.log('----------click', item.VALUE)
              }
            }}
          >
            {
              item.icon
                ? (<span className='sidebar__item-icon'>{item.icon}</span>)
                : ''
            }
            <span className='sidebar__item-title'>{item.title}</span>
            {
              hasChildren &&
              <i className={classNames('sidebar__item-toggle', 'hi-icon', expandIcon)} />
            }
          </div>
          {
            hasChildren && isExpanded && this.renderNavs(item.children)
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
      showSub
    } = this.state

    let {
      navs,
      changeCollapse,
      showSubnavs,
      style
    } = this.props

    return (
      <aside className={`layout__sidebar sidebar ${collapse ? 'sidebar--collapsed' : ''}`} style={style}>
        <div className='sidebar__wrapper'>
          { this.renderNavs(navs) }
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
