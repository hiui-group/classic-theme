import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import classNames from 'classnames'
import Base from '../base'
import { renderRoutes } from '../../util/router'
import './style/index'

class Index extends Component {
  static type = 'classic'

  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routes,
      logo,
      footer,
      config,
      breadcrumb
    } = this.props
    const layoutClasses = classNames(
      'layout',
      'layout--classic',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`,
      config.theme && `theme__${config.theme}`
    )
    const extraProps = {
      setCollapse: this.setCollapse.bind(this),
      breadcrumb,
      footer
    }

    return (
      <div className={layoutClasses}>
        <Header header={header} logo={logo} />
        <div className='layout__body'>
          {renderRoutes(routes, extraProps, {}, this.renderProxy.bind(this))}
        </div>
      </div>
    )
  }
}
export default Base(Index)
