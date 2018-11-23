import React from 'react'
import classNames from 'classnames'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    items: []
  }

  LOCK = false
  deep = 0

  constructor (props) {
    super(props)

    const value = [1, 1]
    const activeNav = value.slice()
    const activeNavs = this.getActiveNavs(activeNav)

    this.state = {
      ctrls: {},
      active: '',
      collapse: false,
      value,
      activeNav,
      activeNavs,
      showSub: false
    }
  }

  componentWillReceiveProps (props) {

  }

  componentDidMount () {
    let { current, navs } = this.props
    const { items = [] } = navs
    current = current || (items[0] ? items[0].key : '')

    this.setState({active: current})
  }

  getActiveNavs (activeNav, navs = this.props.navs) {
    const _navs = navs.slice()
    this.prepareNavs(_navs, activeNav)
    console.log('--------_navs', _navs)
    return _navs
  }

  prepareNavs (items, activeNav, currentValue = []) {
    items.slice().map((item, index) => {
      currentValue.splice(this.deep, 1, index)
      const hasChildren = Array.isArray(item.children)
      const activeStatus = this.checkActive(currentValue, activeNav) // 0代表激活当前项，-1未激活，1激活的是子项
      const isExpanded = activeStatus >= 0
      console.log('---------activeStatus', this.deep, activeStatus, currentValue, item.title)

      if (hasChildren && isExpanded) {
        ++this.deep
      }

      item.hasChildren = hasChildren
      item.activeStatus = activeStatus
      item.value2 = currentValue.slice()
      // item.isExpanded = activeStatus > 0
      if (item.isExpanded) {
        item.isExpanded = false
      } else {
        item.isExpanded = activeStatus >= 0
      }

      if (hasChildren && isExpanded) {
        this.prepareNavs(item.children, activeNav, currentValue)
        currentValue.pop()
        --this.deep
      }
    })
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

  checkActive (currentValue, value) { // 0代表激活当前项，-1未激活，1激活的是子项
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

  arrayContain (arr1, arr2) {
    let flag = true
    if (arr1.length >= arr2.length) {
      return false
    }
    arr1.every((a, i) => {
      if (a !== arr2[i]) {
        flag = false
        return false
      }
      return true
    })
    return flag
  }

  renderNavs (items) {
    const navs = []
    items.slice().map((item, index) => {
      const hasChildren = Array.isArray(item.children)
      const activeStatus = item.activeStatus
      const isExpanded = item.isExpanded
      const expandIcon = isExpanded ? 'icon-up' : 'icon-down'

      navs.push(
        <li
          key={index}
        >
          <div
            className={classNames('sidebar__item-link', 'sidebar__item', {'sidebar__item--active': activeStatus === 0})}
            onClick={e => {
              e.stopPropagation()
              if (item.to) {

              } else {
                let value = item.value2
                if (!isExpanded && this.arrayContain(item.value2, this.state.value)) {
                  value = this.state.value
                }
                const activeNavs = this.getActiveNavs(value)
                this.setState({
                  activeNavs,
                  activeNav: item.value2
                })
                console.log('----------click', item.value2)
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
