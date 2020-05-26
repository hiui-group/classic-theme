import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Item from './Item'
import SubMenu from './SubMenu'
import './style/index'
class Menu extends Component {
  constructor (props) {
    super(props)
    const { activeId, collapsed } = this.props
    const activeIndex = this.getActiveIndex(activeId)
    let expandIndex = []
    this.clickOutsideHandel = this.clickOutside.bind(this)
    if (this.isNoMiniVertaicalMenu(collapsed)) {
      // 垂直非mini菜单默认打开激活项
      expandIndex = [activeIndex.split('-').slice(0, -1).join('-')]
    }
    this.state = {
      activeId: this.props.activeId,
      expandIndex,
      activeIndex,
      collapsed
    }
    this.clickInsideFlag = false // click在menu标识
  }

  componentWillReceiveProps (nextProps) {
    const { activeId, data, collapsed } = nextProps
    if (activeId !== this.props.activeId || !_.isEqual(data, this.props.data)) {
      const activeIndex = this.getActiveIndex(activeId, data)

      this.setState({
        activeId: activeId,
        activeIndex
      })
      this.isNoMiniVertaicalMenu(collapsed) &&
        this.setState({
          expandIndex: [activeIndex.split('-').slice(0, -1).join('-')]
        })
    }

    if (collapsed !== this.props.collapsed) {
      this.setState({
        collapsed: collapsed
      })
    }
  }

  componentDidMount () {
    window.addEventListener('click', this.clickOutsideHandel)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.clickOutsideHandel)
  }

  clickOutside () {
    if (!this.clickInsideFlag && !this.isNoMiniVertaicalMenu()) {
      this.setState({
        expandIndex: []
      })
    }

    this.clickInsideFlag = false
  }

  clickInside () {
    this.clickInsideFlag = true
  }

  getExpandIndex (clickedIndex) {
    if (!clickedIndex) {
      return []
    }
    const { accordion } = this.props
    const { expandIndex } = this.state
    let _clickedIndex = clickedIndex
    let subInExpandIndex = false

    let _expandIndex = expandIndex.filter((item) => {
      // 点击父菜单时，需要把已展开的子菜单过滤掉，因为父菜单关闭时所有子菜单也要关闭
      const flag = item.startsWith(_clickedIndex)
      if (flag) {
        subInExpandIndex = true
      }
      return !flag
    })
    subInExpandIndex && _expandIndex.push(_clickedIndex) // subInExpandIndex为true说明其有子菜单被展开，在点击需要关闭

    const index = _expandIndex.indexOf(clickedIndex)

    if (index > -1) {
      // 点击同一个submenu，如果已展开则关闭
      _clickedIndex = clickedIndex.split('-').slice(0, -1).join('-')
    }

    if (!accordion && this.isNoMiniVertaicalMenu()) {
      // 非手风琴模式只有在垂直非mini状态下才生效
      index > -1 ? _expandIndex.splice(index, 1, _clickedIndex) : _expandIndex.push(_clickedIndex)

      return _expandIndex
    } else {
      return _clickedIndex ? [_clickedIndex] : []
    }
  }

  isNoMiniVertaicalMenu (collapsed = this.state.collapsed) {
    // 垂直非mini菜单
    return this.props.placement === 'vertical' && !collapsed
  }

  getActiveMenus (menus, activeId, activeMenus = []) {
    let result
    for (let index in menus) {
      let _activeMenus = [...activeMenus]
      if (menus[index].id === activeId) {
        _activeMenus.push(index)
        result = _activeMenus
      } else if (menus[index].children) {
        _activeMenus.push(index)
        result = this.getActiveMenus(menus[index].children, activeId, _activeMenus)
      }
      if (result) {
        break
      }
    }
    if (result) {
      return result
    }
  }

  getActiveIndex (activeId, menu) {
    // 获取激活item对应的索引，以'-'拼接成字符串
    const { data } = this.props

    if (activeId === undefined || activeId === '') {
      return ''
    }
    const activeMenus = this.getActiveMenus(menu || data, activeId, [])
    return (activeMenus && activeMenus.join('-')) || ''
  }

  onClick (indexs, id, data) {
    const expandIndex = this.isNoMiniVertaicalMenu()
      ? this.state.expandIndex
      : this.getExpandIndex('') // 非mini垂直菜单选中时不需要收起子菜单
    const oldId = this.state.activeId

    this.setState(
      {
        activeId: id,
        activeIndex: indexs,
        expandIndex
      },
      () => {
        this.props.onClick(id, oldId, data)
      }
    )
  }

  onClickSubMenu (index) {
    const expandIndex = this.getExpandIndex(index)

    this.clickInside()
    this.setState(
      {
        expandIndex
      },
      () => {
        index && this.props.onClickSubMenu && this.props.onClickSubMenu(index.split('-'))
      }
    )
  }

  renderItem (data, index, props = {}) {
    // render menu item
    const { activeIndex } = this.state
    const mergeProps = Object.assign(
      {
        onClick: this.onClick.bind(this),
        id: data.id,
        icon: data.icon,
        activeIndex,
        index: index,
        disabled: data.disabled,
        key: index,
        data
      },
      props
    )

    return <Item {...mergeProps}>{data.content}</Item>
  }

  renderMenu = (data, parentIndex = '') => {
    const { placement, theme } = this.props
    const { activeIndex, expandIndex, collapsed } = this.state
    let items = []
    const renderMenu = this.renderMenu
    data.forEach((item, index) => {
      const indexStr = parentIndex !== '' ? parentIndex + '-' + index : '' + index
      const level = indexStr.split('-').length

      if (item.children) {
        items.push(
          <SubMenu
            key={index}
            theme={theme}
            onClick={this.onClickSubMenu.bind(this)}
            clickInside={this.clickInside.bind(this)}
            index={indexStr}
            level={level}
            activeIndex={activeIndex}
            expandIndex={expandIndex}
            disabled={item.disabled}
            content={item.content}
            icon={item.icon}
            renderMenu={renderMenu}
            datas={item.children}
            mode={placement}
            mini={collapsed}
          />
        )
      } else {
        items.push(this.renderItem(item, indexStr, { level }))
      }
    })

    return items
  }

  render () {
    const { data, placement, theme } = this.props
    const { collapsed } = this.state
    const cls = classNames('hi-menu', `theme__${theme}`, `hi-menu--${placement}`, {
      'hi-menu--mini': collapsed
    })

    return (
      <div className={cls}>
        <ul className='hi-menu-items'>{this.renderMenu(data)}</ul>
      </div>
    )
  }
}

Menu.defaultProps = {
  placement: 'vertical',
  onClick: () => {},
  activeId: '',
  collapsed: false,
  showCollapse: false,
  showAllSubMenus: false,
  accordion: true
}

export default Menu
