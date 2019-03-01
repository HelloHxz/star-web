class HistoryRouteUtil {
  constructor() {
    this.routeCore = null;
  }

  push = (path, params) => {
    const _params = params || {};
    this.routeCore.push(path, _params);
  }

  replace = (path, params) => {
    this.routeCore.replace(path, params);
  }

  match = () => {
    return {
      path: this.getPathFromUrl(),
      query: this.getQueryFromUrl() || {},
    };
  }

  getPathFromUrl = () => {
    const nameArr = window.location.pathname.split('html');
    const s = nameArr[1];
    if (!s) {
      return this.config.root || '';
    }
    const sArr = s.split('?');
    let path = sArr[0] || '';
    if (path.indexOf('/') === 0) {
      path = path.substring(1);
    }
    return path;
  }

  getQueryStringFromUrl = () => {
    const Arr = window.location.href.split('?');
    if (Arr.length < 2) {
      return null;
    }
    const str = Arr[Arr.length - 1];
    const strArr = str.split('#');
    return strArr[0];
  }

  getQueryFromUrl = () => {
    const queryStr = this.getQueryStringFromUrl();
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

  combinePathAndQuery = (path, params) => {
    let _path = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    const paramsArr = [];
    const _params = params || {};
    // eslint-disable-next-line
    for (const key in _params) {
      const pVal = _params[key];
      // eslint-disable-next-line
      if (!isNaN(pVal) || typeof (pVal) === 'string') {
        paramsArr.push(`${key}=${encodeURIComponent(pVal)}`);
      } else {
        console.warn(`url 传参 ${key} 不是字符串类型或数字`);
      }
    }
    if (paramsArr.length > 0) {
      _path = `${_path}?${paramsArr.join('&')}`;
    }
    return `${window.location.href.split('.html')[0]}.html/${_path}`;
  }
}

export default new HistoryRouteUtil();
