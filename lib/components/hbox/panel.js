"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Panel)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.getSize = function (position, parent) {
      var widtOrHeight = _this.props.widtOrHeight;
      var layoutInfo = parent.layoutInfo;

      if (!layoutInfo[position]) {
        return 0;
      }

      if (!layoutInfo[position][widtOrHeight]) {
        layoutInfo[position][widtOrHeight] = 60;
      }

      return layoutInfo[position][widtOrHeight];
    }, _this.getStatus = function (position, parent) {
      if (!parent.layoutInfo[position]) {
        return null;
      }

      return parent.layoutInfo[position].status;
    }, _this.getStyle = function () {
      var _this$props = _this.props,
          firstPanelPos = _this$props.firstPanelPos,
          lastPanelPos = _this$props.lastPanelPos,
          widtOrHeight = _this$props.widtOrHeight,
          style = _this$props.style;
      var cloneStyle = Object.assign({}, style || {});
      var _this$props2 = _this.props,
          position = _this$props2.position,
          parent = _this$props2.parent;

      var firstBoxStatus = _this.getStatus(firstPanelPos, parent);

      var lastBoxStatus = _this.getStatus(lastPanelPos, parent);

      var firstBoxSize = _this.getSize(firstPanelPos, parent);

      var lastBoxSize = _this.getSize(lastPanelPos, parent);

      delete cloneStyle.position;
      delete cloneStyle[lastPanelPos];
      delete cloneStyle.height;
      delete cloneStyle.width;
      delete cloneStyle[firstPanelPos];

      if (position === firstPanelPos) {
        if (firstBoxStatus === 'slidehide') {
          cloneStyle[firstPanelPos] = 0 - parseInt(firstBoxSize, 0);
        } else {
          cloneStyle[firstPanelPos] = 0;
        }

        cloneStyle[widtOrHeight] = firstBoxSize;
      } else if (position === 'middle') {
        if (firstBoxStatus === 'popshow' || firstBoxStatus === 'pophide' || firstBoxStatus === 'slidehide') {
          cloneStyle[firstPanelPos] = 0;
        } else {
          cloneStyle[firstPanelPos] = firstBoxSize;
        }

        if (lastBoxStatus === 'popshow' || lastBoxStatus === 'pophide' || lastBoxStatus === 'slidehide') {
          cloneStyle[lastPanelPos] = 0;
        } else {
          cloneStyle[lastPanelPos] = lastBoxSize;
        }
      } else if (position === lastPanelPos) {
        if (lastBoxStatus === 'slidehide') {
          cloneStyle[lastPanelPos] = 0 - parseInt(lastBoxSize, 10);
        } else {
          cloneStyle[lastPanelPos] = 0;
        }

        cloneStyle[widtOrHeight] = lastBoxSize;
      }

      return cloneStyle;
    }, _temp));
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var boxType = this.props.boxType;
      var _this$props3 = this.props,
          position = _this$props3.position,
          parent = _this$props3.parent,
          className = _this$props3.className,
          children = _this$props3.children,
          firstPanelPos = _this$props3.firstPanelPos,
          lastPanelPos = _this$props3.lastPanelPos;
      var status = this.getStatus(position, parent);
      var classNameArr = ["star-".concat(boxType, "-panel"), "star-".concat(boxType, "-panel-").concat(position).concat(status ? "-".concat(status) : '')];

      if (position === 'middle') {
        var firstBoxStatus = this.getStatus(firstPanelPos, parent);
        var lastBoxStatus = this.getStatus(lastPanelPos, parent);

        if (firstBoxStatus === 'popshow' || firstBoxStatus === 'pophide') {
          classNameArr.push("star-".concat(boxType, "-transition-top-none"));
        }

        if (lastBoxStatus === 'popshow' || lastBoxStatus === 'pophide') {
          classNameArr.push("star-".concat(boxType, "-transition-bottom-none"));
        }
      }

      if (className) {
        classNameArr.push(className);
      }

      return _react.default.createElement("div", {
        style: this.getStyle(),
        className: classNameArr.join(' ')
      }, children);
    }
  }]);

  return Panel;
}(_react.default.Component);

var _default = Panel;
exports.default = _default;