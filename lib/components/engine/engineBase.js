"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _route = _interopRequireDefault(require("../route"));

var _routeUtil = _interopRequireDefault(require("../route/routeUtil/routeUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaseEngin =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseEngin, _React$Component);

  function BaseEngin(props) {
    var _this;

    _classCallCheck(this, BaseEngin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseEngin).call(this, props));

    _this.setRouteLeaveHook = function (pageInstance, cb) {
      _this.currentLeaveHookInfo = {
        cb: cb,
        pageInstance: pageInstance
      };
    };

    _this._urlChange = function () {
      if (_this.isBlockingRender) {
        _this.isBlockingRender = false;
        return;
      }

      var toURLInfo = _routeUtil.default.getUrlInfo();

      if (_this.fromURLInfo.routeKey > toURLInfo.routeKey) {
        _this.routeAction = 'back';
      } else {
        _this.routeAction = 'forward';
      }

      if (_this.currentLeaveHookInfo) {
        var registerHookRouteKey = _this.currentLeaveHookInfo.pageInstance.props.urlInfo.routeKey;

        if (registerHookRouteKey === _this.fromURLInfo.routeKey) {
          _this.currentLeaveHookInfo.cb({
            ok: function ok() {
              _this._renderByPath(toURLInfo);
            },
            cancel: function cancel() {
              // 修复URL
              _this.isBlockingRender = true;

              if (_this.routeAction === 'back') {
                window.history.go(1);
              } else if (_this.routeAction === 'forward') {
                window.history.go(-1);
              }
            }
          });
        } else {
          _this._renderByPath(toURLInfo);
        }
      } else {
        _this._renderByPath(toURLInfo);
      }
    };

    _this._renderByPath = function (toURLInfo) {
      _this.setState({
        path: _routeUtil.default.getPathFromUrl()
      });

      _this.fromURLInfo = toURLInfo;
    };

    var config = props.config;

    _routeUtil.default.registerEngine({
      engine: _assertThisInitialized(_this),
      config: config
    });

    _this.fromURLInfo = _routeUtil.default.getUrlInfo();
    _this.isBlockingRender = false;
    _this.routeAction = ''; // forward back replace refresh

    _this.state = {
      path: _routeUtil.default.getPathFromUrl()
    };
    return _this;
  }

  _createClass(BaseEngin, [{
    key: "render",
    value: function render() {
      var config = this.props.config;
      var path = this.state.path;
      var GlobalPage = config.pages['/'];

      var route = _react.default.createElement(_route.default, {
        path: path,
        config: config
      });

      if (GlobalPage) {
        return _react.default.createElement(GlobalPage, null, route);
      }

      return route;
    }
  }]);

  return BaseEngin;
}(_react.default.Component);

exports.default = BaseEngin;