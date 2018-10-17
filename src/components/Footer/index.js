import React from 'react'
import './index.scss'

class Footer extends React.Component {
  render () {
    const { className, footer } = this.props

    return (
      <div id='J_Footer' className={`footer ${className}`}>
        {footer}
      </div>
    )
  }
}

export default Footer
