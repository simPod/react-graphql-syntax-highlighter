'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rules = require('./utils/Rules.js');

var _runParser = require('./utils/runParser.js');

var _runParser2 = _interopRequireDefault(_runParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _printer = require('graphql/language/printer');

var _parser = require('graphql/language/parser');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphqlCodeBlock = function (_Component) {
  _inherits(GraphqlCodeBlock, _Component);

  function GraphqlCodeBlock() {
    _classCallCheck(this, GraphqlCodeBlock);

    return _possibleConstructorReturn(this, (GraphqlCodeBlock.__proto__ || Object.getPrototypeOf(GraphqlCodeBlock)).apply(this, arguments));
  }

  _createClass(GraphqlCodeBlock, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          queryBody = _props.queryBody;


      var formatted = void 0;
      try {
        formatted = (0, _printer.print)((0, _parser.parse)(queryBody));
      } catch (e) {
        return _react2.default.createElement(
          'div',
          null,
          '[PARSE ERROR] ',
          queryBody
        );
      }

      var highlighted = [];
      var rowKeys = [];
      (0, _runParser2.default)(formatted, {
        eatWhitespace: function eatWhitespace(stream) {
          return stream.eatWhile(_Rules.isIgnored);
        },
        LexRules: _Rules.LexRules,
        ParseRules: _Rules.ParseRules
      }, function (stream, state, style, rowIndex, newRow) {
        var _sourceText = stream._sourceText,
            _start = stream._start,
            _pos = stream._pos;


        if (newRow) {
          rowKeys.push(_sourceText);
          highlighted.push([]);
        }
        var substr = _sourceText.substring(_start, _pos);
        highlighted[highlighted.length - 1].push(_react2.default.createElement(
          'span',
          { key: rowKeys.length + '-' + _start + '-' + _pos, className: style },
          substr
        ));
      });

      var body = [];
      highlighted.forEach(function (row, index) {
        body.push(_react2.default.createElement(
          'pre',
          { key: 'query-row-' + index },
          row
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: className },
        body
      );
    }
  }]);

  return GraphqlCodeBlock;
}(_react.Component);

GraphqlCodeBlock.propTypes = {
  queryBody: _propTypes2.default.string,
  className: _propTypes2.default.string
};
exports.default = GraphqlCodeBlock;