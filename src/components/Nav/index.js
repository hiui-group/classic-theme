import React from 'react'
import classnames from 'classnames'
import './index.scss'

class Item extends React.Component {
  render () {
    return (
      <div className='header__nav-item'>
        {this.props.children}
      </div>
    )
  }
}
class NavGroup extends React.Component {
  render () {
    const {position, style, className} = this.props
    const cls = classnames(
      'header__nav',
      `header__nav--${position}`,
      className && className
    )
    return <div className={cls} style={{...style}}>
      {this.props.children}
    </div>
  }
}
NavGroup.Item = Item
export default NavGroup
