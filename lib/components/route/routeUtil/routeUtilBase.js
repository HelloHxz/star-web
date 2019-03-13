"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectUtil = _interopRequireDefault(require("../../utils/objectUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteUtilCommon = function RouteUtilCommon() {
  var _this = this;

  _classCallCheck(this, RouteUtilCommon);

  this.registerEngine = function (_ref) {
    var engine = _ref.engine,
        config = _ref.config;
    _this.engine = engine;
    _this.routeConfig = config;
    _this.routeSeedKey = config.routeSeedKey || '__r';

    var initQuery = _this.getQueryFromUrl();

    _this.routeSeed = _this._getRouteSeed(initQuery);
  };

  this._getRouteSeed = function (query) {
    var _query = query || {};

    var routeSeed = _query[_this.routeSeedKey] || 0; // eslint-disable-next-line

    if (isNaN(routeSeed)) {
      routeSeed = 0;
    }

    return parseInt(routeSeed, 10);
  };

  this._parseRouteConfig = function () {};

  this._parsePath = function (path) {
    /*
      const router = {
        home: require('./demo/home/pages/home/page.js'),
        'other/:id': require('./demo/home/pages/home/page.js'),
        'some/somepage': require('./demo/home/pages/somepage/page.js'),
      };
    */
    var pathArr = path.split('/');
    var curPageName = pathArr.shift();
    return {
      PageClass: _this.routeConfig.pages[curPageName],
      remainPath: pathArr.join('/')
    };
  };

  this.setRouteLeaveHook = function (pageInstance, cb) {
    _this.engine.setRouteLeaveHook(pageInstance, cb);
  };

  this.removeLeaveHook = function () {
    _this.engine.removeLeaveHook();
  };

  this.getConfigRootPath = function () {
    return _this.routeConfig.root || '';
  };

  this.match = function () {
    return {
      path: _this.getPathFromUrl(),
      query: _this.getQueryFromUrl() || {}
    };
  };

  this.push = function (path, query) {
    var _query = query || {};

    if (!_objectUtil.default.isJson(_query)) {
      console.error(' push 方法参数需为JSON对象！如：Utils.route.push("xx/xx", { id: 12})');
      return;
    }

    if (_this._urlIsSame(path, _query)) {
      return;
    }

    _this.routeSeed += 1;
    _query[_this.routeSeedKey] = _this.routeSeed;

    _this.engine.push(path, _query);
  };

  this.replace = function (path, query) {
    var _query = query || {};

    if (_this._urlIsSame(path, _query)) {
      return;
    }

    if (!_objectUtil.default.isJson(_query)) {
      console.error(' replace 方法参数需为JSON对象！如：Utils.route.replace("xx/xx", { id: 12})');
      return;
    }

    _this.engine.replace(path, query);
  };

  this.getQueryStringFromUrl = function (_urlInfo) {
    var urlInfo = _urlInfo || _this.getUrlInfo();

    var Arr = urlInfo.href.split('?');

    if (Arr.length < 2) {
      return null;
    }

    var str = Arr[Arr.length - 1];
    var strArr = str.split('#');
    return strArr[0];
  };

  this.getQueryFromUrl = function (_urlInfo) {
    var urlInfo = _urlInfo || _this.getUrlInfo();

    var queryStr = _this.getQueryStringFromUrl(urlInfo);

    if (!queryStr) {
      return null;
    }

    var re = {};
    var queryArr = queryStr.split('&');

    for (var i = 0, j = queryArr.length; i < j; i += 1) {
      var keyValueArr = queryArr[i].split('=');

      if (keyValueArr.length === 2) {
        re = re || {};

        var _keyValueArr = _slicedToArray(keyValueArr, 2),
            key = _keyValueArr[0],
            value = _keyValueArr[1];

        re[key] = decodeURIComponent(value);
      }
    }

    return re;
  };

  this.queryToString = function (query) {
    var queryArr = [];

    var _query = query || {}; // eslint-disable-next-line


    for (var key in _query) {
      var pVal = _query[key]; // eslint-disable-next-line

      if (!isNaN(pVal) || typeof pVal === 'string') {
        queryArr.push("".concat(key, "=").concat(encodeURIComponent(pVal)));
      } else {
        console.warn("url \u4F20\u53C2 ".concat(key, " \u4E0D\u662F\u5B57\u7B26\u4E32\u7C7B\u578B\u6216\u6570\u5B57, queryToString \u65B9\u6CD5\u62A5\u9519"));
      }
    }

    return queryArr.join('&');
  };

  this.getUrlInfo = function () {
    var re = {
      href: window.location.href,
      hash: window.location.hash,
      pathname: window.location.pathname
    };

    var pagename = _this.getPathFromUrl(re);

    var routeSeed = _this._getRouteSeed(_this.getQueryFromUrl(re));

    var query = _this.getQueryFromUrl(re);

    return _objectSpread({}, re, {
      routeSeed: parseInt(routeSeed, 10),
      pagename: pagename,
      routeKey: "".concat(pagename, "_").concat(routeSeed),
      query: query
    });
  };

  this._urlIsSame = function (path, query) {
    var urlInfo = _this.getUrlInfo();

    return _this._pathIsSame(path, urlInfo.pagename) && _this._queryIsSame(query || {}, urlInfo.query || {});
  };

  this._pathIsSame = function (path1, path2) {
    return _this._addPrefixAndSubFix(path1) === _this._addPrefixAndSubFix(path2);
  };

  this._queryIsSame = function (query1, query2) {
    if (_this._getQueryCount(query1) !== _this._getQueryCount(query2)) {
      return false;
    }

    var isSame = true;

    for (var key in query1) {
      if (key !== _this.routeSeedKey) {
        if (query1[key].toString() !== query2[key].toString()) {
          isSame = false;
          break;
        }
      }
    }

    return isSame;
  };

  this._getQueryCount = function (query) {
    var i = 0;

    for (var key in query) {
      if (key !== _this.routeSeedKey) {
        i += 1;
      }
    }

    return i;
  };

  this._addPrefixAndSubFix = function (path) {
    var _path = path;

    if (_path.substring(0, 1) !== '/') {
      _path = "/".concat(_path);
    }

    if (_path.substring(_path.length - 1) !== '/') {
      _path = "".concat(_path, "/");
    }

    return _path;
  };
};

exports.default = RouteUtilCommon;