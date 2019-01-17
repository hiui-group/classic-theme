import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes, matchRoutes } from 'react-router-config'
import Sider from '../Sider'
import Provider from '../../util/context'

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

  routes = false

  constructor (props) {
    super(props)
    props.options.setCollapse(props.extend)
  }

  getCurrentPath (routes) {
    const branch = matchRoutes(this.getRoutes(), this.props.location.pathname)
    console.log('---------------matchRoutes', branch)

    return branch[0].match.url
    // return this.props.location.pathname
  }

  getRoutes () {
    if (!this.routes) {
      let r = this.props.options.routeConfig.routes.filter((item) => {
        return item.path === this.props.match.path
      })

      this.routes = r[0].routes
    }

    return this.routes
  }

  changeCollapse (collapse) {
    this.props.options.setCollapse(collapse)
    this.props.changeCollapse(collapse)
  }

  render () {
    const {
      sider,
      extend,
      accordion
    } = this.props
    let routes = this.getRoutes()

    return (
      <React.Fragment>
        <Sider
          accordion={accordion}
          current={this.getCurrentPath()}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
          extend={extend}
        />
        <div className='layout__main'>
          <div className='layout__content'>
            <div className='layout__sider-content'>
              {renderRoutes(routes)}
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default Provider(SiderLayout)
