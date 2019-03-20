import ObjectUtils from '../../utils/objectUtil';
import NotFoundPage from './NotFoundPage';

export default class RouteUtilCommon {
  registerEngine = ({ engine, config }) => {
    this.engine = engine;
    this._urlChangeidSeed = 0;
    this._urlChangeEvents = {};
    this.routeConfig = config;
    this.routeSeedKey = config.routeSeedKey || '__r';
    const initQuery = this.getQueryFromUrl();
    this.routeSeed = this._getRouteSeed(initQuery);
  }

  addUrlChangeListener = (cb) => {
    this._urlChangeidSeed += 1;
    const id = this._urlChangeidSeed.toString();
    this._urlChangeEvents[id] = cb;
    return id;
  }

  removeUrlChangeListener = (id) => {
    delete this._urlChangeEvents[id];
  }

  _getRouteSeed = (query) => {
    const _query = query || {};
    let routeSeed = _query[this.routeSeedKey] || 0;
    // eslint-disable-next-line
    if (isNaN(routeSeed)) {
      routeSeed = 0;
    }
    return parseInt(routeSeed, 10);
  }

  _parseRouteConfig = () => {

  }

  _parsePath = (path) => {
    /*
      const router = {
        home: require('./demo/home/pages/home/page.js'),
        'other/:id': require('./demo/home/pages/home/page.js'),
        'some/somepage': require('./demo/home/pages/somepage/page.js'),
      };
    */
    const pathArr = path.split('/');
    const curPageName = pathArr.shift();
    return {
      PageClass: this.routeConfig.pages[curPageName] || NotFoundPage,
      remainPath: pathArr.join('/'),
    };
  }

  setRouteLeaveHook = (pageInstance, cb) => {
    this.engine.setRouteLeaveHook(pageInstance, cb);
  }

  removeLeaveHook = () => {
    this.engine.removeLeaveHook();
  }

  getConfigRootPath = () => {
    return this.routeConfig.root || '';
  }

  match = () => {
    return {
      path: this.getPathFromUrl(),
      query: this.getQueryFromUrl() || {},
    };
  }

  push = (path, query) => {
    const _query = query || {};
    if (!ObjectUtils.isJson(_query)) {
      console.error(' push 方法参数需为JSON对象！如：Utils.route.push("xx/xx", { id: 12})');
      return;
    }
    if (this._urlIsSame(path, _query)) {
      return;
    }
    this.routeSeed += 1;
    _query[this.routeSeedKey] = this.routeSeed;
    this.engine.push(path, _query);
  }

  replace = (path, query) => {
    const _query = query || {};
    if (this._urlIsSame(path, _query)) {
      return;
    }
    if (!ObjectUtils.isJson(_query)) {
      console.error(' replace 方法参数需为JSON对象！如：Utils.route.replace("xx/xx", { id: 12})');
      return;
    }
    this.engine.replace(path, query);
  }

  getQueryStringFromUrl = (_urlInfo) => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const Arr = urlInfo.href.split('?');
    if (Arr.length < 2) {
      return null;
    }
    const str = Arr[Arr.length - 1];
    const strArr = str.split('#');
    return strArr[0];
  }

  getQueryFromUrl = (_urlInfo) => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const queryStr = this.getQueryStringFromUrl(urlInfo);
    if (!queryStr) {
      return null;
    }
    let re = {};
    const queryArr = queryStr.split('&');
    for (let i = 0, j = queryArr.length; i < j; i += 1) {
      const keyValueArr = queryArr[i].split('=');
      if (keyValueArr.length === 2) {
        re = re || {};
        const [key, value] = keyValueArr;
        re[key] = decodeURIComponent(value);
      }
    }
    return re;
  }

  queryToString = (query) => {
    const queryArr = [];
    const _query = query || {};
    // eslint-disable-next-line
    for (const key in _query) {
      const pVal = _query[key];
      // eslint-disable-next-line
      if (!isNaN(pVal) || typeof (pVal) === 'string') {
        queryArr.push(`${key}=${encodeURIComponent(pVal)}`);
      } else {
        console.warn(`url 传参 ${key} 不是字符串类型或数字, queryToString 方法报错`);
      }
    }
    return queryArr.join('&');
  }

  getUrlInfo = () => {
    const re = {
      href: window.location.href,
      hash: window.location.hash,
      pathname: window.location.pathname,
    };
    const pagename = this.getPathFromUrl(re);
    const routeSeed = this._getRouteSeed(this.getQueryFromUrl(re));
    const query = this.getQueryFromUrl(re);
    return {
      ...re,
      ...{
        routeSeed: parseInt(routeSeed, 10),
        pagename,
        routeKey: `${pagename}_${routeSeed}`,
        query,
      },
    };
  }

  _urlIsSame = (path, query) => {
    const urlInfo = this.getUrlInfo();
    return this._pathIsSame(path, urlInfo.pagename)
    && this._queryIsSame(query || {}, urlInfo.query || {});
  }

  _pathIsSame = (path1, path2) => {
    return this._addPrefixAndSubFix(path1) === this._addPrefixAndSubFix(path2);
  }

  _queryIsSame = (query1, query2) => {
    if (this._getQueryCount(query1) !== this._getQueryCount(query2)) {
      return false;
    }
    let isSame = true;
    for (const key in query1) {
      if (key !== this.routeSeedKey) {
        if (query1[key].toString() !== query2[key].toString()) {
          isSame = false;
          break;
        }
      }
    }
    return isSame;
  }

  _getQueryCount = (query) => {
    let i = 0;
    for (const key in query) {
      if (key !== this.routeSeedKey) {
        i += 1;
      }
    }
    return i;
  }

  _addPrefixAndSubFix = (path) => {
    let _path = path;
    if (_path.substring(0, 1) !== '/') {
      _path = `/${_path}`;
    }
    if (_path.substring(_path.length - 1) !== '/') {
      _path = `${_path}/`;
    }
    return _path;
  }
}
