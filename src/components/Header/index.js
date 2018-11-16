import React, { Component } from 'react'
import './index.scss'

class Header extends Component {
  render () {
    const {
      logo,
      header = ''
    } = this.props

    return (
      <header className='layout__header header'>
        { logo }
        { header }
      </header>
    )
  }
}

export default Header
