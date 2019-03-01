import RouteUtilCommon from './routeUtilCommon';

class HashRouteUtil extends RouteUtilCommon {
  getPathFromUrl = (_urlInfo) => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const nameArr = urlInfo.hash.split('#');
    const s = nameArr[1];
    if (!s) {
      return this.config.root || '';
    }
    const sArr = s.split('?');
    return sArr[0] || '';
  }

  combinePathAndQuery = (path, query) => {
    let _path = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    const queryStr = this.queryToString(query);
    let hash = `#${_path}`;
    if (queryStr.length > 0) {
      hash = `${hash}?${queryStr}`;
    }
    return hash;
  }
}

export default new HashRouteUtil();
