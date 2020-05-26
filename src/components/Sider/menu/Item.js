import React, { Component } from 'react'
import classNames from 'classnames'
import Title from './Title'

class Item extends Component {
  render () {
    const { children, disabled, onClick, level, activeIndex, id, icon, index, data } = this.props
    const isActive = activeIndex === index
    const cls = classNames(
      'hi-menu-item',
      'hi-menu-item__title',
      'hi-menu__title',
      `hi-menu--${level}`,
      {
        'hi-menu-item--disabled': disabled,
        'hi-menu-item--active': isActive
      }
    )
    return (
      <li
        className={cls}
        key={index}
        onClick={(e) => {
          e.stopPropagation()
          if (!disabled) {
            onClick(index, id, data)
          }
        }}
      >
        <Title icon={icon} content={children} />
      </li>
    )
  }
}

Item.defaultProps = {
  disabled: false,
  activeIndex: ''
}
export default Item
