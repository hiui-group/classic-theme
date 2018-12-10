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
      url,
      place = 'horizontal'
    } = this.props

    return (
      <div className={`logo logo__${place}`} style={style}>
        <img className='logo__img' src={logoUrl} alt={alt} height={height} />
        <a href={url} title={title}>
          <span className='logo__title'>{text}</span>
        </a>
      </div>
    )
  }
}

export default Logo
