import RouteUtil from '../route/routeUtil/routeUtil';
import ObjectUtil from './objectUtil';
import BrowserUtil from './browserUtil';

class Utils {
  constructor() {
    this.route = RouteUtil;
    this.object = ObjectUtil;
    this.browser = BrowserUtil;
    console.log(RouteUtil);
  }
}

export default new Utils();
