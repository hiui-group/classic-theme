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
    logo: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    breadcrumb: PropTypes.array
  }
  static defaultProps = {
    config: {
      type: 'flat',
      color: 'white'
    },
    breadcrumb: [],
    routes: []
  }

  setCollapse (collapse) {
    this.setState({collapse})
  }

  renderProxy (page) {
    if (page.type.displayName === 'HIUI_SiderLayout') {
      return page
    } else {
      const {footer} = this.props

      return (
        <div className='layout__main'>
          <div className='layout__content'>
            {page}
          </div>
          { footer }
        </div>
      )
    }
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
