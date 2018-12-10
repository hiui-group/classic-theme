import React from 'react'
import PropTypes from 'prop-types'
import {
  Router
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
  static isHash = false
  static defaultProps = {
    config: {
      type: 'flat',
      color: 'white'
    }
  }

  getCurrentPath () {
    const {sider} = this.props
    console.log(this.props)
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
    let _h = historManager.getHistory()
    if (!_h) {
      _h = historManager.createBrowserHistory()
    }
    // console.log(this.type)
    // document.body.classList.add(`config__content--${config.type || 'flat'}` )
    // document.body.classList.add(`config__header--${config.color || 'white'}` )
    // document.body.classList.add(`config__content-${config.type || 'flat'}`)
    // document.body.classList.add(`config__header-${config.color || 'white'}`)
    return (
      <Router history={_h}>
        {super.render()}
      </Router>
    )
  }
}

export default baseLayout
