import React from 'react'
import PropTypes from 'prop-types'
import { matchRoutes } from 'react-router-config'
import { renderRoutes } from '../../util/router'
import BreadCrumb from '../BreadCrumb'
import Sider from '../Sider'
import classNames from 'classnames'

class SiderLayout extends React.Component {
  static propTypes = {
    changeCollapse: PropTypes.func,
    accordion: PropTypes.bool,
    sider: PropTypes.array
  }
  static defaultProps = {
    changeCollapse: () => {},
    sider: [],
    accordion: false
  }
  static displayName = 'HIUI_SiderLayout'

  getCurrentRoute (routes) {
    const branch = matchRoutes(this.getRoutes(), this.props.location.pathname)

    // return branch[0]&&branch[0].match.url || this.props.location.pathname
    // console.log(this.getRoutes(), this.props.location.pathname, branch)
    return branch[0] && branch[0].route
    // return this.props.location.pathname
  }

  getRoutes () {
    return this.props.routes
  }

  changeCollapse (collapse) {
    this.props.setCollapse(collapse)
    this.props.changeCollapse(collapse)
  }

  render () {
    const {
      sider,
      extend,
      accordion,
      breadcrumb,
      logo,
      deepClone,
      footer
    } = this.props
    let routes = this.getRoutes()

    const mCls = classNames(
      'layout__main',
      'layout__main--lr',
      footer && 'layout__main--footer'
    )
    return (
      <React.Fragment>
        <Sider
          accordion={accordion}
          currentRoute={this.getCurrentRoute()}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
          extend={extend}
          routes={routes}
          logo={logo}
          deepClone={deepClone}
        />
        <div className={mCls}>
          <div className='layout__content'>
            { breadcrumb.length > 0 && <BreadCrumb items={breadcrumb} /> }
            {renderRoutes(routes)}
          </div>
          { footer }
        </div>

      </React.Fragment>
    )
  }
}
export default SiderLayout
