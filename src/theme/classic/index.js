import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BreadCrumb from '../../components/BreadCrumb'
import classNames from 'classnames'
import Base from '../base'
import { renderRoutes } from '../../util/router'
import './index.scss'

class Index extends Component {
  static type = 'classic'

  renderProxy (page) {
    if (page.type.displayName === 'HIUI_SiderLayout') {
      return page
    } else {
      return (
        <div className='layout__main'>
          <div className='layout__content'>
            <BreadCrumb items={this.props.breadcrumb} />
            {page}
          </div>
        </div>
      )
    }
  }

  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routeConfig,
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
      routeConfig,
      breadcrumb
    }

    return (
      <div className={layoutClasses}>
        <Header header={header} logo={logo} />
        <div className='layout__body'>
          {renderRoutes(routeConfig.routes, extraProps, {}, this.renderProxy.bind(this))}
          { footer && <Footer footer={footer} /> }
        </div>
      </div>
    )
  }
}
export default Base(Index)
