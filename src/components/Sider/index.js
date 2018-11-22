import React from 'react'
import classNames from 'classnames'
import './index.scss'

class Sider extends React.Component {
  static defaultProps = {
    items: []
  }

  LOCK = false
  deep = 0

  state = {
    ctrls: {},
    active: '',
    collapse: false,
    subNavs: [],
    showSub: false
  }

  componentDidMount () {
    let { current, sider } = this.props
    const { items = [] } = sider
    current = current || (items[0] ? items[0].key : '')

    this.setState({active: current})
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

  checkActive (currentValue) {
    const value = [1, 1]
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

  renderNavs (items, currentValue = []) {
    const navs = []
    items.slice().map((item, index) => {
      currentValue.splice(this.deep, 1, index)
      const hasChildren = Array.isArray(item.children)
      const activeStatus = this.checkActive(currentValue) // 0代表激活当前项，-1未激活，1激活的是子项
      const isExpanded = activeStatus >= 0
      console.log('---------activeStatus', this.deep, activeStatus, currentValue, item.title)
      const expandIcon = isExpanded ? 'icon-up' : 'icon-down'
      const _currentValue = currentValue.slice()

      if (hasChildren && isExpanded) {
        ++this.deep
      }

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
                console.log('----------click', _currentValue)
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
            hasChildren && isExpanded && this.renderNavs(item.children, currentValue)
          }
        </li>
      )

      if (hasChildren && isExpanded) {
        currentValue.pop()
        --this.deep
      }
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
      sider,
      changeCollapse,
      showSubnavs,
      style
    } = this.props

    return (
      <aside className={`layout__sidebar sidebar ${collapse ? 'sidebar--collapsed' : ''}`} style={style}>
        <div className='sidebar__wrapper'>
          { this.renderNavs(sider) }
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
