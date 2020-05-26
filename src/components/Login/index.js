import React, { useState } from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import './style/index'

const Login = ({ headUrl = '', name = '', children = '', style, icon }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`hi-login ${open ? 'hi-login--active' : ''} ${children ? '' : 'hi-login--empty'}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setOpen(!open)
      }}
    >
      {headUrl ? (
        <div className='hi-login__img' style={{ backgroundImage: 'url(' + headUrl + ')' }} />
      ) : (
        ''
      )}
      {icon ? (
        <span style={{ marginRight: 5 }}>
          <Icon name={icon} />
        </span>
      ) : (
        ''
      )}
      {name ? <div className='hi-login__name'>{name}</div> : ''}
      {children ? (
        <div
          className='hi-login__info'
          onClick={(e) => {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
          }}
        >
          {children}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Login
