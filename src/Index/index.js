import React, { Component } from 'react'
import {
  Router
} from 'react-router-dom'
import history from '../util/history'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import './index.scss'
import Header from '../components/Header'
import Sider from '../components/Sider'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'

class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapse: false
    }
  }

  static propTypes = {
    header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    routes: PropTypes.array,
    navs: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      to: PropTypes.string
    })),
    theme: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string
    }),
    footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    logo: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
  }

  static defaultProps = {
    theme: {
      type: 'flat',
      color: 'white'
    }
  }

  getCurrentPath () {
    return window.location.href.split(window.location.origin)[1]
  }

  changeCollapse (collapse) {
    this.setState({collapse})
  }

  render () {
    const {
      collapse
    } = this.state
    let {
      header,
      routes,
      sider,
      theme,
      breadCrumb,
      footer,
      logo
    } = this.props
    document.body.classList.add(`theme__content-${theme.type || 'flat'}`)
    document.body.classList.add(`theme__header-${theme.color || 'white'}`)

    return (
      <Router history={history}>
        <div className={`layout ${collapse ? 'layout--collapsed' : ''}`}>
          <Header header={header} logo={logo} />

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
              <div
                className='layout__content'
              >
                {renderRoutes(routes)}
              </div>
            </main>

            <Sider
              accordion={false}
              current={this.getCurrentPath()}
              sider={sider}
              changeCollapse={this.changeCollapse.bind(this)}
            />

            {
              footer
                ? (
                  <Footer footer={footer} />
                ) : ''
            }

          </div>
        </div>
      </Router>
    )
  }
}

export default Index
