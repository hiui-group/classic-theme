import React, { Component } from 'react'

import { renderRoutes } from 'react-router-config'
import './index.scss'
import Header from '../../components/Header'
import Sider from '../../components/Sider'
import BreadCrumb from '../../components/BreadCrumb'
import Footer from '../../components/Footer'
import classNames from 'classnames'
import Base from '../base'
class Index extends Component {
  type = 'classic'
  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routes,
      sider,
      breadCrumb,
      footer,
      logo,
      config
    } = this.props
    const lcls = classNames(
      'layout',
      'layout--classic',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`,
      config.theme && `theme__${config.theme}`
    )
    return (
      <div className={lcls}>
        <Header header={header} logo={logo} />
        <Sider
          accordion={false}
          current={this.getCurrentPath()}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
        />
        <div className='layout__body'>
          <main className='layout__main'>
            {
              breadCrumb
                ? (
                  <BreadCrumb
                    items={breadCrumb.items}
                    sign={breadCrumb.sign}
                  />
                ) : ''
            }
            <div
              className='layout__content'
            >
              {renderRoutes(routes)}
            </div>
          </main>
          {
            footer
              ? (
                <Footer footer={footer} />
              ) : ''
          }

        </div>
      </div>
    )
  }
}
Index.isHash = false
export default Base(Index)
