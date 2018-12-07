import React, { Component } from 'react'
import {
  Router
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import './index.scss'
import Header from '../components/Header'
import Sider from '../components/Sider'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'
import historManager from '../util/common'

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
    config: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string
    }),
    footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    logo: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
  }

  static defaultProps = {
    config: {
      type: 'flat',
      color: 'white'
    }
  }

  getCurrentPath () {
    const {sider} = this.props
    const mode = sider.isHash

    let pathname = window.location.pathname
    let hash = window.location.hash

    if (hash) {
      pathname = hash.replace(/#?(.*)/, (a, b) => {
        return b
      })
    }
    return mode ? pathname : window.location.href.split(window.location.origin)[1]
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
      config,
      breadCrumb,
      footer,
      logo
    } = this.props
    let _h = historManager.getHistory()
    if (!_h) {
      _h = historManager.setHistory(Index.isHash)
    }
    const _children = (
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
    )

    document.body.classList.add(`config__content-${config.type || 'flat'}`)
    document.body.classList.add(`config__header-${config.color || 'white'}`)
    // document.body.classList.add(`theme__${config.theme || 'hiui-blue'}`)

    return (
      <Router history={_h}>
        {_children}
      </Router>
    )
  }
}
Index.hash = false
export default Index
