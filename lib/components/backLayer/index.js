"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.less");

var _componentUtil = _interopRequireDefault(require("../utils/componentUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BackLayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BackLayer, _React$Component);

  function BackLayer() {
    _classCallCheck(this, BackLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(BackLayer).apply(this, arguments));
  }

  _createClass(BackLayer, [{
    key: "onClick",
    value: function onClick() {
      var onClick = this.props.onClick;

      if (onClick) {
        onClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          show = _this$props.show,
          style = _this$props.style,
          className = _this$props.className,
          onClick = _this$props.onClick;
      var status = show ? 'show' : 'hide';

      if (status === 'hide' && this.preStatus !== 'show') {
        return null;
      }

      this.preStatus = status;

      var positionMode = _componentUtil.default.getConfig('position', this.props);

      var classNameArr = ['star-bk-layer', "star-bk-layer-".concat(positionMode, " star-bk-layer-").concat(status)];
      var p = {};

      if (style) {
        p.style = style;
      }

      if (className) {
        classNameArr.push(className);
      }

      if (onClick) {
        p.onClick = this.onClick.bind(this);
      }

      return _react.default.createElement("div", _extends({}, p, {
        className: classNameArr.join(' ')
      }));
    }
  }]);

  return BackLayer;
}(_react.default.Component);

exports.default = BackLayer;