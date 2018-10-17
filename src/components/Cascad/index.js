import React from 'react'
import './index.scss'

class Cascad extends React.Component {
  render () {
    const {
      title,
      status,
      style,
      children
    } = this.props

    return (
      <div className='cascad' style={style}>
        <div className='cascad__title-content'>
          <h3 className='cascad__title'>{title}</h3>
          {
            status
              ? (<div className='cascad__status'>{status}</div>)
              : ''
          }
        </div>
        <div className='cascad__content'>{children}</div>
      </div>
    )
  }
}

export default Cascad
