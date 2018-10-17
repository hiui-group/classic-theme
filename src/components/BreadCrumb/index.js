import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

/**
 * 面包屑
 * @prop items {array}  面包屑内容
 * [
 *   {
 *     title {string} 面包屑名字
 *     to {string}  要跳转的路由
 *   }
 * ]
 * @prop sign {string}  分割符号
 */
class BreadCrumb extends React.Component {
  static defaultProps = {
    items: [],
    sign: '/'
  }

  render () {
    const {
      items = [],
      sign = '/',
      style
    } = this.props

    return (
      <div
        className='breadcrumb'
        style={style}
      >
        {
          items.map((v, i) => {
            if (v.title) {
              if (i === items.length - 1) {
                return (
                  <span
                    key={i}
                    className='breadcrumb-item'
                  >
                    {
                      v.to
                        ? (<Link to={v.to}>{v.title}</Link>)
                        : (<span>{v.title}</span>)
                    }
                  </span>
                )
              } else {
                return (
                  <span
                    key={i}
                    className='breadcrumb-item'
                  >
                    {
                      v.to
                        ? (<Link to={v.to}>{v.title}</Link>)
                        : (<span>{v.title}</span>)
                    }
                    <span className='breadcrumb-sign'> {sign} </span>
                  </span>
                )
              }
            }
          })
        }
      </div>
    )
  }
}

export default BreadCrumb
