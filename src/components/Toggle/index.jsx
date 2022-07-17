import React from 'react'
import { MenuOutlined } from '@hi-ui/icons'

const Toggle = ({ collapsed, show, onToggle, icon }) => {
  return show ? (
    <div
      className="sider__toggle"
      onClick={() => {
        const _collapsed = !collapsed
        onToggle(_collapsed)
      }}
    >
      {icon || <MenuOutlined />}
    </div>
  ) : null
}

export default Toggle
