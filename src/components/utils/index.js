import RouteUtil from '../route/routeUtil/routeUtil';
import ObjectUtil from './objectUtil';
import BrowserUtil from './browserUtil';

class Utils {
  constructor() {
    this.route = RouteUtil;
    this.object = ObjectUtil;
    this.browser = BrowserUtil;
  }
}

export default new Utils();
