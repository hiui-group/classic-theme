import React from 'react'
import './index.scss'

class Footer extends React.Component {
  render () {
    const { footer } = this.props

    return (
      <div className='layout__footer footer'>
        {footer}
      </div>
    )
  }
}

export default Footer
