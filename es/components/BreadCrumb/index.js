function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

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

var BreadCrumb = function (_React$Component) {
  _inherits(BreadCrumb, _React$Component);

  function BreadCrumb() {
    _classCallCheck(this, BreadCrumb);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  BreadCrumb.prototype.render = function render() {
    var _props = this.props,
        _props$items = _props.items,
        items = _props$items === undefined ? [] : _props$items,
        _props$sign = _props.sign,
        sign = _props$sign === undefined ? '/' : _props$sign,
        style = _props.style;


    return React.createElement(
      'div',
      {
        className: 'breadcrumb',
        style: style
      },
      items.map(function (v, i) {
        if (v.title) {
          if (i === items.length - 1) {
            return React.createElement(
              'span',
              {
                key: i,
                className: 'breadcrumb-item'
              },
              v.to ? React.createElement(
                Link,
                { to: v.to },
                v.title
              ) : React.createElement(
                'span',
                null,
                v.title
              )
            );
          } else {
            return React.createElement(
              'span',
              {
                key: i,
                className: 'breadcrumb-item'
              },
              v.to ? React.createElement(
                Link,
                { to: v.to },
                v.title
              ) : React.createElement(
                'span',
                null,
                v.title
              ),
              React.createElement(
                'span',
                { className: 'breadcrumb-sign' },
                ' ',
                sign,
                ' '
              )
            );
          }
        }
      })
    );
  };

  return BreadCrumb;
}(React.Component);

BreadCrumb.defaultProps = {
  items: [],
  sign: '/'
};


export default BreadCrumb;