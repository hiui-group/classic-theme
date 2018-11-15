import React, { Component } from 'react'
import {
  HashRouter as Router // HashRouter / BrowserRouter
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import './index.scss'
import Header from '../components/Header'
import Sider from '../components/Sider'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'
import '@hi-ui/core-css'

class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapse: false,
      hasSub: false
    }

    if (props.footer) {
      this.resizeEvent = this.resizeEvent().bind(this)
      this.changeFooterPosition = this.changeFooterPosition.bind(this)
    }
  }
  static propTypes = {
    header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    routes: PropTypes.array,
    sider: PropTypes.arrayOf(PropTypes.shape({
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
      type: 'inner',
      colro: 'white'
    }
  }
  componentDidMount () {
    if (this.props.footer) {
      this.changeFooterPosition()

      window.addEventListener('hashchange', this.changeFooterPosition)
      window.addEventListener('resize', this.resizeEvent)
    }
  }

  componentWillUnmount () {
    if (this.props.footer) {
      window.removeEventListener('hashchange', this.changeFooterPosition)
      window.removeEventListener('resize', this.resizeEvent)
      this.resizeEvent = null
    }
  }

  changeFooterPosition () {
    const $footer = document.querySelector('#J_Footer')
    const $main = document.querySelector('#J_Main')

    const innerHeight = window.innerHeight
    const footerHeight = $footer.offsetHeight
    const mainHeight = $main.offsetHeight

    if (innerHeight - mainHeight < footerHeight + 20) {
      $footer.classList.remove('absolute')
    } else {
      $footer.classList.add('absolute')
    }
  }

  resizeEvent () {
    let start = Date.now()

    return function () {
      let now = Date.now()

      if (now - start > 200) {
        this.changeFooterPosition()
        start = now
      }
    }
  }

  getPage (items) {
    let pathname = window.location.pathname
    let hash = window.location.hash
    let res = ''

    if (hash) {
      pathname = hash.replace(/#?(.*)/, (a, b) => {
        return b
      })
    }

    const fn = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const cur = arr[i]
        if (cur.to === pathname) {
          res = cur.key
          return
        } else if (cur.children) {
          fn(cur.children)
        }
      }
    }

    fn(items)

    return res
  }

  changeCollapse (collapse) {
    this.setState({collapse})
  }

  showSubnavs (hasSub) {
    this.setState({hasSub})
  }

  render () {
    const {
      collapse,
      hasSub
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
    document.body.classList.add(`theme-${theme.type || 'inner'}`)
    document.body.classList.add(`theme-${theme.color || 'white'}`)

    return (
      <Router>
        <div className={`dashboard ${collapse ? 'collapse' : ''} ${hasSub ? 'has-sub' : ''}`}>
          <div className='dashboard__top'>
            {logo}
            <Header header={header} />
          </div>
          <div className='dashboard__body'>
            <Sider
              current={this.getPage(sider)}
              sider={sider}
              changeCollapse={this.changeCollapse.bind(this)}
              showSubnavs={this.showSubnavs.bind(this)}
            />
            <div className='main'>
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
                className='content'
              >
                {renderRoutes(routes)}
              </div>
            </div>
          </div>
          {
            footer
              ? (
                <Footer footer={footer} />
              ) : ''
          }
        </div>
      </Router>
    )
  }
}

export default Index
