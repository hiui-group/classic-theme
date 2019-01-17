import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Header from '../../components/Header'
import classNames from 'classnames'
import Base from '../base'
import { ContextProvider } from '../../util/context'
import './index.scss'

class Index extends Component {
  static type = 'classic'

  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routeConfig,
      logo,
      config
    } = this.props
    const layoutClasses = classNames(
      'layout',
      'layout--classic',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`,
      config.theme && `theme__${config.theme}`
    )

    return (
      <ContextProvider value={{...this.props, setCollapse: this.setCollapse.bind(this)}}>
        <div className={layoutClasses}>
          <Header header={header} logo={logo} />
          <div className='layout__body'>
            {renderRoutes(routeConfig.routes)}
          </div>
        </div>
      </ContextProvider>
    )
  }
}
export default Base(Index)
