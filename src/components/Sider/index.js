import React from 'react'
import Cookies from 'js-cookie'
import historyManager from '../../util/common'
import Menu from '@hi-ui/hiui/es/menu'
import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import './style/index'

class Sider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.parseSides(this.props.sider),
      // items: this.props.sider,
      showSub: true,
      collapse: false,
      // activeId: (this.props.currentRoute && this.props.currentRoute.path) || '',
      activeId: this.props.currentPath,
      mini: false
    }
    this.isSwitchToggle = false
    this.collapseCookie = '$$hiui-theme-collapse'
  }
  parseSides(datas) {
    // 由于 Menu 的升级，接受数据格式发生变化，现接受 id content  ，下面代码为处理旧代码的兼容
    return datas.map((m, n) => {
      if (m.children) {
        const c = this.parseSides(m.children)
        return {
          id: m.to,
          content: m.title,
          ...m,
          children: c
        }
      }
      return {
        id: m.to,
        content: m.title,
        ...m
      }
    })
  }
  componentDidMount() {
    if (Cookies.get(this.collapseCookie) === 'true') {
      this.collapseToggle()
    }
  }
  collapseToggle() {
    const { collapse } = this.state
    const { changeCollapse } = this.props

    this.isSwitchToggle = true // 切换toggle标识
    Cookies.set(this.collapseCookie, !collapse)

    this.setState(
      {
        collapse: !collapse,
        showSub: collapse,
        mini: !this.state.mini
      },
      () => {
        changeCollapse(!collapse)
        this.isSwitchToggle = false
      }
    )
  }
  // componentWillReceiveProps(props) {
  //   // if (props.deepClone) {
  //   //   const items = this.parseSides(this.props.sider)
  //   //   this.setState({
  //   //     items
  //   //   })
  //   // }
  //   // 当前路由变更，则 activeId 也需要变更
  //   if (props.currentPath !== this.props.currentPath) {
  //     this.setState({
  //       activeId: this.props.currentPath
  //     })
  //   }
  // }

  onClick(id, pId, data) {
    if (!data.to) {
      return
    }
    if (data.outerChain) {
      window.location.href = data.to
      return
    }
    // this.setState({
    //   activeId: data.id
    // })
    const _h = historyManager.getHistory()
    if (_h.location.pathname !== data.to) {
      _h.replace(data.to)
    }
  }
  render() {
    let { collapse, items, mini, activeId } = this.state
    console.log(items)
    let { style, logo, extend, genuine, color } = this.props
    const sCls = classNames(
      'layout__sidebar',
      'sidebar',
      collapse && 'sidebar--collapsed',
      genuine && 'sidebar--genuine',
      color === 'black' ? 'sidebar__menu--white' : 'sidebar__menu--black'
    )
    return (
      <aside className={sCls} style={style}>
        {!collapse && logo}
        <Menu
          mode="vertical"
          mini={mini}
          activeId={this.props.currentPath}
          onClick={this.onClick.bind(this)}
          datas={items}
        />
        <div className="sidebar__extend">{!collapse && extend}</div>
        <span className="sidebar__toggle" onClick={this.collapseToggle.bind(this)} />
      </aside>
    )
  }
}

Sider.defaultProps = {
  accordion: true,
  deepClone: true
}
export default Sider
