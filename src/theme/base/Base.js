import React from 'react'
import PropTypes from 'prop-types'
import {
  Router,
  matchPath as match
} from 'react-router-dom'
import historManager from '../../util/common'

const baseLayout = WrapperComponent => class extends WrapperComponent {
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

  getCurrentPath (routes) {
    console.log('-----------getCurrentPath')
    match({ routes, location: window.location.href }, (error, redirectLocation, renderProps) => {
      console.log('---------------match', error, redirectLocation, renderProps)
    })

    // const {sider} = this.props
    // const mode = sider.isHash
    let pathname = window.location.pathname
    let hash = window.location.hash

    if (hash) {
      pathname = hash.replace(/#?(.*)/, (a, b) => {
        return b
      })
    }
    return pathname
    // return mode ? pathname : window.location.href.split(window.location.origin)[1]
  }

  setCollapse (collapse) {
    this.setState({collapse})
  }

  render () {
    let _h = historManager.getHistory()

    // document.body.classList.add(`config__content--${config.type || 'flat'}` )
    // document.body.classList.add(`config__header--${config.color || 'white'}` )
    return (
      <Router history={_h}>
        <div>
          {/* {this.props.headerRoutes && renderRoutes(this.props.headerRoutes)} */}
          {super.render()}
        </div>

      </Router>
    )
  }
}

export default baseLayout
