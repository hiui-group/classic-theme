import React from 'react'
import './index.scss'

class Logo extends React.Component {
  render () {
    const {
      logoUrl = '',
      text = '',
      alt,
      title,
      height = '40',
      style,
      url
    } = this.props

    return (
      <div className='logo' style={style}>
        <a href={url} title={title}>
          <img className='logo__img' src={logoUrl} alt={alt} height={height} />
          <span className='logo__title'>{text}</span>
        </a>
      </div>
    )
  }
}

export default Logo
