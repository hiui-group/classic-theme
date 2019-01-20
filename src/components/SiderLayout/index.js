import React from 'react'
import PropTypes from 'prop-types'
import { matchRoutes } from 'react-router-config'
import { renderRoutes } from '../../util/router'
import BreadCrumb from '../../components/BreadCrumb'
import Sider from '../Sider'

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

  routes = false

  constructor (props) {
    super(props)
    props.setCollapse(props.extend)
  }

  compomentWillReceiveProps (nextProps) {
    if (nextProps.extend !== this.props.extend) {
      nextProps.setCollapse(nextProps.extend)
    }
  }

  getCurrentRoute (routes) {
    const branch = matchRoutes(this.getRoutes(), this.props.location.pathname)
    // console.log('---------------matchRoutes', branch, this.props.location)

    // return branch[0]&&branch[0].match.url || this.props.location.pathname
    return branch[0] && branch[0].route
    // return this.props.location.pathname
  }

  getRoutes () {
    if (!this.routes) {
      let r = this.props.routeConfig.routes.filter((item) => {
        return item.path === this.props.match.path
      })

      this.routes = r[0].routes
    }

    return this.routes
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
      breadcrumb
    } = this.props
    let routes = this.getRoutes()

    return (
      <React.Fragment>
        <Sider
          accordion={accordion}
          currentRoute={this.getCurrentRoute()}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
          extend={extend}
          routes={routes}
        />
        <div className='layout__main'>
          <div className='layout__content'>
            <BreadCrumb items={breadcrumb} />
            {renderRoutes(routes)}
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default SiderLayout
