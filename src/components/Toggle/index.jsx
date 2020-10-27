import React from 'react'
import Icon from '../icon'

const Toggle = ({ collapsed, show, onToggle }) => {
  return show ? (
    <div
      className='sider__toggle'
      onClick={() => {
        const _collapsed = !collapsed
        onToggle(_collapsed)
      }}
    >
      <Icon name={collapsed ? 'menu-unfold' : 'menu-fold'} />
    </div>
  ) : null
}

export default Toggle
