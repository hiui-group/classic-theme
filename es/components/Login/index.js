function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './index.scss';

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      open: false
    };

    _this.open = _this.open.bind(_this);
    return _this;
  }

  Login.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('click', this.open);
  };

  Login.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.open);
  };

  Login.prototype.open = function open() {
    var open = this.state.open;
    if (open) {
      this.setState({ open: false });
    }
  };

  Login.prototype.render = function render() {
    var _this2 = this;

    var open = this.state.open;
    var _props = this.props,
        _props$headUrl = _props.headUrl,
        headUrl = _props$headUrl === undefined ? '' : _props$headUrl,
        _props$name = _props.name,
        name = _props$name === undefined ? '' : _props$name,
        _props$children = _props.children,
        children = _props$children === undefined ? '' : _props$children,
        style = _props.style;


    return React.createElement(
      'div',
      {
        className: 'login ' + (open ? 'active' : '') + ' ' + (children ? '' : 'no-children'),
        style: style,
        onClick: function onClick(e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          _this2.setState({ open: !open });
        }
      },
      headUrl ? React.createElement('div', { className: 'login-img', style: { backgroundImage: 'url(' + headUrl + ')' } }) : '',
      name ? React.createElement(
        'div',
        { className: 'login-name' },
        name
      ) : '',
      children ? React.createElement(
        'div',
        {
          className: 'login-info',
          onClick: function onClick(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }
        },
        children
      ) : ''
    );
  };

  return Login;
}(React.Component);

export default Login;