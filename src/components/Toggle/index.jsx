import React from 'react'
import Icon from '../icon'

const Toggle = ({ collapsed, show, onToggle, icon }) => {
  return show ? (
    <div
      className="sider__toggle"
      onClick={() => {
        const _collapsed = !collapsed
        onToggle(_collapsed)
      }}
    >
      <Icon name={icon || (collapsed ? 'menu-unfold' : 'menu-fold')} />
    </div>
  ) : null
}

export default Toggle
