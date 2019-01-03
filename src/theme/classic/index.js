import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './index.scss'
import Header from '../../components/Header'
import Sider from '../../components/Sider'
import Footer from '../../components/Footer'
import classNames from 'classnames'
import Base from '../base'
import { ContextProvider } from '../../util/context'
class Index extends Component {
  static type = 'classic'
  changeCollapse (collapse) {
    this.setState({collapse})
  }
  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routeConfig,
      sider,
      footer,
      logo,
      config
    } = this.props
    const layoutClasses = classNames(
      'layout',
      'layout--classic',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`,
      routeConfig && routeConfig.hasTopNav && 'layout--topnav',
      config.theme && `theme__${config.theme}`
    )
    console.log(this.props)
    return (
      <ContextProvider value={{...this.props, changeCollapse: this.changeCollapse.bind(this)}}>
        <div className={layoutClasses}>
          <Header header={header} logo={logo} />
          {
            routeConfig && routeConfig.hasTopNav && routeConfig.routes.length > 0 ? <div className='layout__body'>

              {
                routeConfig.routes.map((route, index) => {
                  return <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                })
              }

            </div> : (
              <React.Fragment>
                <div className='layout__body'>
                  <div
                    className='layout__main'
                  >
                    <div className='layout__content'>
                      {renderRoutes(routeConfig.routes)}
                    </div>
                  </div>
                  {
                    footer
                      ? (
                        <Footer footer={footer} />
                      ) : ''
                  }

                </div>

                <Sider
                  accordion={false}
                  current={this.getCurrentPath()}
                  sider={sider}
                  changeCollapse={this.changeCollapse.bind(this)}
                />
              </React.Fragment>
            )
          }

        </div>
      </ContextProvider>
    )
  }
}
export default Base(Index)
