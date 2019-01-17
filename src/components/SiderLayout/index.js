import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import Sider from '../Sider'
import Provider from '../../util/context'
import { matchPath } from 'react-router'

class SiderLayout extends React.Component {
  static propTypes = {
    changeCollapse: PropTypes.func,
    extend: PropTypes.bool,
    accordion: PropTypes.bool,
    sider: PropTypes.object
  }
  static defaultProps = {
    changeCollapse: () => {},
    extend: true,
    sider: [],
    accordion: false
  }

  constructor (props) {
    super(props)
    props.options.setCollapse(props.extend)
  }

  getCurrentPath (routes) {
    console.log('-----------this.props', this.props)
    // const match = matchPath(this.props.location.pathname, routes)
    const match = matchPath(this.props.location.pathname, {
      path: '/products/:id',
      exact: true,
      strict: false,
      name: 'aaa'
    })
    console.log('---------------match', match)
    return this.props.location.pathname
  }

  changeCollapse (collapse) {
    this.props.options.setCollapse(collapse)
    this.props.changeCollapse(collapse)
  }

  render () {
    const {
      sider,
      extend,
      options,
      match,
      accordion
    } = this.props
    let r = options.routeConfig.routes.filter((item) => {
      return item.path === match.path
    })
    console.log('---------------r', sider)

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
              {renderRoutes(r[0].routes)}
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default Provider(SiderLayout)
