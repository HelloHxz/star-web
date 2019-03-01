import RouteUtilCommon from './routeUtilCommon';

class HistoryRouteUtil extends RouteUtilCommon {
  getPathFromUrl = (_urlInfo) => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const nameArr = urlInfo.pathname.split('html');
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

  combinePathAndQuery = (path, query) => {
    let _path = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    const queryStr = this.queryToString(query);
    if (queryStr.length > 0) {
      _path = `${_path}?${queryStr}`;
    }
    return `${window.location.href.split('.html')[0]}.html/${_path}`;
  }
}

export default new HistoryRouteUtil();
