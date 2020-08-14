import React from 'react'
import classNames from 'classnames'

import './style/index'
import './iconfont.js'

const Icon = ({ name, filled = false, className, style = {}, onClick }) => {
  const { color, fontSize, ...otherStyle } = style
  return (
    <svg
      className={classNames(className, 'hi-theme-icon')}
      aria-hidden='true'
      onClick={(e) => {
        onClick && onClick(e)
      }}
      style={{
        fill: style.color,
        height: style.fontSize,
        width: style.fontSize,
        ...otherStyle
      }}
    >
      <use xlinkHref={`#icon${name}-${filled ? 'filled' : 'outlined'}`} />
    </svg>
  )
}
export default Icon
