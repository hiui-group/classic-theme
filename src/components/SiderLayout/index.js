import React from 'react'
import Sider from '../Sider'
import Provider from '../../util/context'
import { Switch, Route, Redirect } from 'react-router-dom'

class SiderLayout extends React.Component {
  getCurrentPath () {
    return this.props.location.pathname
  }
  changeCollapse (collapse) {
    this.props.options.changeCollapse && this.props.options.changeCollapse(collapse)
  }
  render () {
    let r = this.props.options.routeConfig.routes.filter((item) => {
      return item.path === this.props.match.path
    })
    const sider = this.props.options.sider[this.props.match.path.substr(1)] || this.props.options.sider
    return (
      <React.Fragment>
        <Sider
          accordion
          current={this.getCurrentPath()}
          sider={sider}
          changeCollapse={this.changeCollapse.bind(this)}
        />
        <div className='layout__main'>
          <div className='layout__content'>
            <div className='layout__sider-content'>
              <Switch>
                <Route
                  key={'root'}
                  path={`${this.props.match.path}`}
                  exact
                  render={() => <Redirect to={`${this.props.match.path}${r[0].routes[0].path}`} />}
                />
                {r.length > 0 && r[0].routes.map((item, index) => {
                  return <Route
                    key={index}
                    exact={item.exact}
                    strict={item.strict}
                    path={`${this.props.match.path}${item.path}`}
                    component={item.component}
                  />
                })
                }
              </Switch>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default Provider(SiderLayout)
