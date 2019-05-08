import React from 'react'

import './style/index'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { renderRoutes } from '../../util/router'
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
      breadcrumb,
      footer,
      config,
      logo
    } = this.props
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
    const extraProps = {
      setCollapse: this.setCollapse.bind(this),
      breadcrumb,
      logo,
      genuine: true, // genuine 模式下 sider 的字体颜色要改为白色，通过此字段判定
      color: config.color
    }

    return (
      <div className={cls}>
        {
          header && <Header
            header={header}
            border={breadcrumb.length > 0}
          />
        }

        <div className={bodyCls}>
          {renderRoutes(routes, extraProps, {}, this.renderProxy.bind(this))}
          { footer && <Footer footer={footer} /> }
        </div>
      </div>
    )
  }
}

export default Base(Index)
