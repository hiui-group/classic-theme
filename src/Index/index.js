import React, { Component } from 'react'
import {
  HashRouter as Router // HashRouter / BrowserRouter
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import './index.scss'
import Header from '../components/Header'
import Sider from '../components/Sider'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'
import '@hi-ui/core-css/lib/index.scss'

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
      header = '',
      routes = [],
      sider = {
        items: [],
        top: ''
      },
      theme = {
        type: 'inner',
        color: 'dark'
      },
      breadCrumb,
      footer
    } = this.props

    document.body.classList.add(`theme-${theme.type}`)
    document.body.classList.add(`theme-${theme.color}`)

    return (
      <Router>
        <div className={`dashboard ${collapse ? 'collapse' : ''} ${hasSub ? 'has-sub' : ''}`}>
          <Header
            header={header}
          />
          <Sider
            current={this.getPage(sider.items)}
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
