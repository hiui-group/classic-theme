import React from 'react'
import './style/index'

class InfoBlock extends React.Component {
  render () {
    const {
      title,
      list = [],
      style
    } = this.props

    return (
      <div className='info-block' style={style}>
        {
          title
            ? (<h4 className='info-block__title'>{title}</h4>)
            : ''
        }
        <ul>
          {
            list.map((v, i) => (
              <li key={i}>
                <div className='info-block__label'>{v.label}</div>
                <div className='info-block__value'>{v.info}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default InfoBlock
