function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './index.scss';

var Cascad = function (_React$Component) {
  _inherits(Cascad, _React$Component);

  function Cascad() {
    _classCallCheck(this, Cascad);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Cascad.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        status = _props.status,
        style = _props.style,
        children = _props.children;


    return React.createElement(
      'div',
      { className: 'cascad', style: style },
      React.createElement(
        'div',
        { className: 'cascad__title-content' },
        React.createElement(
          'h3',
          { className: 'cascad__title' },
          title
        ),
        status ? React.createElement(
          'div',
          { className: 'cascad__status' },
          status
        ) : ''
      ),
      React.createElement(
        'div',
        { className: 'cascad__content' },
        children
      )
    );
  };

  return Cascad;
}(React.Component);

export default Cascad;