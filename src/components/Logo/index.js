import React from 'react'
import './index.scss'

class Logo extends React.Component {
  render () {
    const {
      logoUrl = '',
      text = '',
      alt,
      height = '40',
      style,
      url
    } = this.props

    return (
      <div className='logo' style={style}>
        <a href={url}>
          <img src={logoUrl} alt={alt} height={height} />
          <span className='logo-title'>{text}</span>
        </a>
      </div>
    )
  }
}

export default Logo
