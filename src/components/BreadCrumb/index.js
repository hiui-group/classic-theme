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
 * @prop separator {string}  分割符号
 */
class BreadCrumb extends React.Component {
  static defaultProps = {
    items: [],
    separator: '/'
  }

  render () {
    const {
      items = [],
      separator = '/',
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
              return (
                <span
                  key={i}
                  className='breadcrumb__item'
                >
                  {
                    v.to
                      ? (<Link to={v.to}>{v.title}</Link>)
                      : (<span>{v.title}</span>)
                  }
                  {
                    i !== items.length - 1 && <span className='breadcrumb__sep'> {separator} </span>
                  }
                </span>
              )
            }
          })
        }
      </div>
    )
  }
}

export default BreadCrumb
