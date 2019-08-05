import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style/index'

class Logo extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.string,
    logoUrl: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    url: PropTypes.string
  }

  static defaultProps = {
    layout: 'horizontal',
    height: '40'
  }

  render () {
    const { alt, className, height, logoUrl, style, name, url } = this.props
    const classes = classNames('logo', className && `${className}`)

    return (
      <div className={classes} style={style}>
        <a className='logo__link' href={url}>
          {logoUrl && <img className='logo__img' src={logoUrl} alt={alt} height={height} />}
          {name && <span className='logo__title'>{name}</span>}
        </a>
      </div>
    )
  }
}

export default Logo
