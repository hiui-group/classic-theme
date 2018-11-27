import React from 'react'
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
    const {pos} = this.props
    return <div className={`header__nav header__nav--${pos}`}>
      {this.props.children}
    </div>
  }
}
NavGroup.Item = Item
export default NavGroup
