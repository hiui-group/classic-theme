import React from 'react'
import classNames from 'classnames'
import './style/index'

const Logo = ({ alt, height = 24, logoUrl, name, url, layout = 'horizontal', mini, extra }) => {
  return (
    <div className={classNames('hi-logo-wrapper', `hi-logo-wrapper--${layout}`)}>
      <a className={classNames('hi-logo', `hi-logo--${layout}`, { 'hi-logo--mini': mini })} href={url}>
        {logoUrl && <img src={logoUrl} alt={alt} height={height} />}
        {name && !mini && <span className="hi-logo__title">{name}</span>}
      </a>
      {!mini && extra}
    </div>
  )
}

export default Logo
