"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _engineBase = _interopRequireDefault(require("./engineBase"));

var _routeUtil = _interopRequireDefault(require("../route/routeUtil/routeUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HistoryEngine =
/*#__PURE__*/
function (_EnginBase) {
  _inherits(HistoryEngine, _EnginBase);

  function HistoryEngine(props) {
    var _this;

    _classCallCheck(this, HistoryEngine);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HistoryEngine).call(this, props));

    _this.init = function () {
      window.onpopstate = function () {
        _this._urlChange();
      };
    };

    _this.push = function (path, query) {
      // todo isSamePath And query return
      window.history.pushState({}, null, _routeUtil.default.combinePathAndQuery(path, query));
      setTimeout(function () {
        _this._urlChange();
      }, 6);
    };

    _this.replace = function (path, query) {
      window.history.replaceState({}, null, _routeUtil.default.combinePathAndQuery(path, query));
    };

    _this.init();

    return _this;
  }

  return HistoryEngine;
}(_engineBase.default);

var _default = function _default(config, rootDom) {
  _reactDom.default.render(_react.default.createElement(HistoryEngine, {
    config: config
  }), rootDom || document.body);
};

exports.default = _default;