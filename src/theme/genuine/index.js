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
      routes = [],
      sider = {
        items: [],
        top: ''
      },
      breadCrumb,
      footer,
      logo,
      config
    } = this.props
    const cls = classNames(
      'layout',
      'layout--genuine',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`
    )
    return (
      <div className={cls}>
        <Header
          header={header}
          border={!!breadCrumb}
        />
        <Sider
          current={this.getCurrentPath(sider.items)}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
          logo={logo}
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
            <div className='layout__content'>
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

export default Base(Index)
