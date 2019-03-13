"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routeUtil = _interopRequireDefault(require("../route/routeUtil/routeUtil"));

var _objectUtil = _interopRequireDefault(require("./objectUtil"));

var _browserUtil = _interopRequireDefault(require("./browserUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function Utils() {
  _classCallCheck(this, Utils);

  this.route = _routeUtil.default;
  this.object = _objectUtil.default;
  this.browser = _browserUtil.default;
  console.log(_routeUtil.default);
};

var _default = new Utils();

exports.default = _default;