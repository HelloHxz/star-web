"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _backLayer = _interopRequireDefault(require("../backLayer"));

var _panel = _interopRequireDefault(require("./panel"));

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

var statusArr = ['popshow', 'pophide', 'dock', 'slideshow', 'slidehide'];

var Box =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box(props) {
    var _this;

    _classCallCheck(this, Box);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Box).call(this, props));
    _this.boxType = props.boxType || 'hbox';
    _this.layoutInfo = {};

    if (_this.boxType === 'hbox') {
      _this.firstPanelPos = 'left';
      _this.lastPanelPos = 'right';
      _this.widtOrHeight = 'width';
    } else {
      _this.firstPanelPos = 'top';
      _this.lastPanelPos = 'bottom';
      _this.widtOrHeight = 'height';
    }

    return _this;
  }

  _createClass(Box, [{
    key: "onBackLayerClick",
    value: function onBackLayerClick() {
      var onBackLayerClick = this.props.onBackLayerClick;

      if (onBackLayerClick) {
        onBackLayerClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          onBackLayerClick = _this$props.onBackLayerClick,
          style = _this$props.style,
          className = _this$props.className;

      if (!children) {
        return null;
      }

      var len = children.length;
      var seed = 0;
      var childrenArr = [];
      var showBk = false;

      for (var i = 0; i < len; i += 1) {
        var panel = children[i];

        if (panel.type === _panel.default) {
          var positions = [this.firstPanelPos, 'middle', this.lastPanelPos];
          var position = positions[seed];
          var status = null;

          if (position === this.firstPanelPos || position === this.lastPanelPos) {
            status = panel.props.status || 'dock';

            if (statusArr.indexOf(status) < 0) {
              status = 'dock';
            }
          }

          if (panel.props.status === 'popshow') {
            showBk = true;
          }

          childrenArr.push(_react.default.cloneElement(panel, {
            position: position,
            key: position,
            parent: this,
            boxType: this.boxType,
            widtOrHeight: this.widtOrHeight,
            firstPanelPos: this.firstPanelPos,
            lastPanelPos: this.lastPanelPos
          }));
          var propsStyle = panel.props.style || {};
          this.layoutInfo[position] = {
            status: status
          };
          this.layoutInfo[position][this.widtOrHeight] = propsStyle[this.widtOrHeight];

          if (childrenArr.length === 3) {
            break;
          }

          seed += 1;
        }
      }

      if (children.length <= 1 || children.length > 3) {
        console.error("".concat(this.boxType, "\u7EC4\u4EF6\u4FDD\u8BC1\u6709\u4FE9\u4E2A\u6216\u8005\u4E09\u4E2APanel\u5B50\u5143\u7D20"));
      }

      var boxStyle = Object.assign({}, style || {});
      delete boxStyle.position;
      var backlayerProps = {};

      if (onBackLayerClick) {
        backlayerProps.onClick = this.onBackLayerClick.bind(this);
      }

      return _react.default.createElement("div", {
        style: boxStyle,
        ref: function ref(root) {
          _this2.root = root;
        },
        className: "star-".concat(this.boxType, " ").concat(className || '')
      }, childrenArr, _react.default.createElement(_backLayer.default, _extends({
        position: "absolute"
      }, backlayerProps, {
        className: "star-".concat(this.boxType, "-bk"),
        show: showBk
      })));
    }
  }]);

  return Box;
}(_react.default.Component);

exports.default = Box;
Box.Panel = _panel.default;