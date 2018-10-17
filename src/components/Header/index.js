import React, { Component } from 'react'
import './index.scss'

class Header extends Component {
  render () {
    const {
      header = '',
      style
    } = this.props

    return (
      <div className='header' style={style}>
        { header }
      </div>
    )
  }
}

export default Header
