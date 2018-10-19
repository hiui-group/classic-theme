function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './index.scss';

var InfoBlock = function (_React$Component) {
  _inherits(InfoBlock, _React$Component);

  function InfoBlock() {
    _classCallCheck(this, InfoBlock);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  InfoBlock.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        _props$list = _props.list,
        list = _props$list === undefined ? [] : _props$list,
        style = _props.style;


    return React.createElement(
      'div',
      { className: 'info-block', style: style },
      title ? React.createElement(
        'h4',
        { className: 'title' },
        title
      ) : '',
      React.createElement(
        'ul',
        null,
        list.map(function (v, i) {
          return React.createElement(
            'li',
            { key: i },
            React.createElement(
              'div',
              { className: 'label' },
              v.label
            ),
            React.createElement(
              'div',
              { className: 'info' },
              v.info
            )
          );
        })
      )
    );
  };

  return InfoBlock;
}(React.Component);

export default InfoBlock;