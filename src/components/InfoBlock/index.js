import React from 'react'
import './index.scss'

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
            ? (<h4 className='title'>{title}</h4>)
            : ''
        }
        <ul>
          {
            list.map((v, i) => (
              <li key={i}>
                <div className='label'>{v.label}</div>
                <div className='info'>{v.info}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default InfoBlock
