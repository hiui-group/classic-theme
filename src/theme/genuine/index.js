import React from 'react'

import { renderRoutes } from 'react-router-config'
import './index.scss'
import Sider from '../../components/Sider'
import Header from '../../components/Header'
import BreadCrumb from '../../components/BreadCrumb'
import Footer from '../../components/Footer'
import Base from '../base'
import classNames from 'classnames'
class Index extends React.Component {
  render () {
    const {
      collapse
    } = this.state
    let {
      header = '',
      routeConfig = [],
      sider = {
        items: [],
        top: ''
      },
      breadCrumb,
      footer,
      logo,
      config,
      extend
    } = this.props
    console.log(routeConfig)
    const cls = classNames(
      'layout',
      'layout--genuine',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`
    )
    const bodyCls = classNames(
      'layout__body',
      !header && 'layout__body--noheader'
    )
    return (
      <div className={cls}>
        {
          header && <Header
            header={header}
            border={!!breadCrumb}
          />
        }
        <Sider
          current={this.getCurrentPath(sider.items)}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
          logo={logo}
          extend={extend}
        />

        <div className={bodyCls}>
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
            <div className='layout__content'>
              {renderRoutes(routeConfig.routes)}
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

export default Base(Index)
