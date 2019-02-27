class HashRouterUtil {
  constructor() {
    this.routerCore = null;
  }

  go = (path, params) => {
    this.routerCore.go(path, params);
  }

  match = () => {
    return {
      path: this.getPathFromUrl(),
      query: this.getQueryFromUrl() || {},
      queryStr: this.getQueryStringFromUrl() || '',
    };
  }

  getPathFromUrl = () => {
    const nameArr = window.location.hash.split('#');
    const s = nameArr[1];
    if (!s) {
      return this.config.root || '';
    }
    const sArr = s.split('?');
    return sArr[0] || '';
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
    const paraStr = this.getQueryStringFromUrl();
    if (!paraStr) {
      return null;
    }
    let re = {};
    const paramsArr = paraStr.split('&');
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

  combinePathAndParams = (path, params) => {
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
    let hash = `#${_path}`;
    if (paramsArr.length > 0) {
      hash = `${hash}?${paramsArr.join('&')}`;
    }
    return hash;
  }
}

export default new HashRouterUtil();