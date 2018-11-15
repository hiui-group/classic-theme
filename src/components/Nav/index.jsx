import React from 'react'
import './index.scss'

class Item extends React.Component {
  render () {
    return (
      <div style={{display: 'inline-block', width: 100}}>
       Item
      </div>
    )
  }
}
class NavGroup extends React.Component {
  render () {
    const {pos} = this.props
    return <div className={`nav__item nav__item--${pos}`}>
      {this.props.children}
    </div>
  }
}
NavGroup.Item = Item
export default NavGroup
