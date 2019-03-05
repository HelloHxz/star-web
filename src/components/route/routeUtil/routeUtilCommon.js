export default class RouteUtilCommon {
  registerEngine = ({ engine, config }) => {
    this.engine = engine;
    this.routeConfig = config;
    this.routeSeedKey = '__r';
    const initQuery = this.getQueryFromUrl();
    this.routeSeed = this._getRouteSeed(initQuery);
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
      PageClass: this.routeConfig.pages[curPageName],
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

  push = (path, params) => {
    const _params = params || {};
    this.routeSeed += 1;
    _params[this.routeSeedKey] = this.routeSeed;
    this.engine.push(path, _params);
  }

  replace = (path, params) => {
    this.engine.replace(path, params);
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
    const paramsArr = queryStr.split('&');
    for (let i = 0, j = paramsArr.length; i < j; i += 1) {
      const keyValueArr = paramsArr[i].split('=');
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
    return {
      ...re,
      ...{
        routeSeed: parseInt(routeSeed, 10),
        pagename,
        routeKey: `${pagename}_${routeSeed}`,
      },
    };
  }
}
