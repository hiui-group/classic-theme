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
  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routes,
      sider,
      footer,
      logo,
      config,
      topNav
    } = this.props
    const lcls = classNames(
      'layout',
      'layout--classic',
      collapse && 'layout--collapsed',
      config.color ? `layout--${config.color}` : 'layout--white',
      config.type && `layout--${config.type}`,
      topNav && 'layout--topnav',
      config.theme && `theme__${config.theme}`
    )
    return (
      <ContextProvider value={{...this.props}}>
        <div className={lcls}>
          <Header header={header} logo={logo} />
          {
            topNav ? <div className='layout__body'>

              {
                routes.map((route, index) => {
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
                <Sider
                  accordion={false}
                  current={this.getCurrentPath()}
                  sider={sider}
                  changeCollapse={this.changeCollapse.bind(this)}
                />
                <div className='layout__body'>
                  <div
                    className='layout__main'
                  >
                    <div className='layout__content'>
                      {renderRoutes(routes)}
                    </div>
                  </div>
                  {
                    footer
                      ? (
                        <Footer footer={footer} />
                      ) : ''
                  }

                </div>
              </React.Fragment>
            )
          }

        </div>
      </ContextProvider>
    )
  }
}
Index.isHash = false
export default Base(Index)
