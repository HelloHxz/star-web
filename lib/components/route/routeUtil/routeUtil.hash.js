"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routeUtilBase = _interopRequireDefault(require("./routeUtilBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HashRouteUtil =
/*#__PURE__*/
function (_RouteUtilBase) {
  _inherits(HashRouteUtil, _RouteUtilBase);

  function HashRouteUtil() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, HashRouteUtil);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HashRouteUtil)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.getPathFromUrl = function (_urlInfo) {
      var urlInfo = _urlInfo || _this.getUrlInfo();

      var nameArr = urlInfo.hash.split('#');
      var s = nameArr[1];

      if (!s) {
        return _this.getConfigRootPath();
      }

      var sArr = s.split('?');
      return sArr[0] || '';
    }, _this.combinePathAndQuery = function (path, query) {
      var _path = path || '';

      if (_path.indexOf('#') === 0) {
        _path = _path.substring(1);
      }

      var queryStr = _this.queryToString(query);

      var hash = "#".concat(_path);

      if (queryStr.length > 0) {
        hash = "".concat(hash, "?").concat(queryStr);
      }

      return hash;
    }, _temp));
  }

  return HashRouteUtil;
}(_routeUtilBase.default);

var _default = new HashRouteUtil();

exports.default = _default;