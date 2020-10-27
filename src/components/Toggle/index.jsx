import React from 'react'
import Icon from '../icon'

const Toggle = ({ mini, show, onToggle }) => {
  return show ? (
    <div
      className="sider__toggle"
      onClick={() => {
        const _mini = !mini
        onToggle(_mini)
      }}
    >
      <Icon name={mini ? 'menu-unfold' : 'menu-fold'} />
    </div>
  ) : null
}

export default Toggle
