import React from 'react'
import classNames from 'classnames'
import './style/index'

const Logo = ({
  alt,
  className,
  height = 40,
  logoUrl,
  style,
  name,
  url,
  layout = 'horizontal'
}) => {
  const classes = classNames('hi-logo', className && `${className}`)
  return (
    <div className={classes} style={style}>
      <a className='hi-logo__link' href={url}>
        {logoUrl && <img className='hi-logo__img' src={logoUrl} alt={alt} height={height} />}
        {name && <span className='hi-logo__title'>{name}</span>}
      </a>
    </div>
  )
}

export default Logo
