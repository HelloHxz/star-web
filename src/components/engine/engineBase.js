import React from 'react';
import Route from '../route';
import RouteUtil from '../route/routeUtil/routeUtil';

export default class BaseEngin extends React.Component {
  constructor(props) {
    super(props);
    const { config } = props;
    RouteUtil.registerEngine({
      engine: this,
      config,
    });
    this.fromURLInfo = RouteUtil.getUrlInfo();
    this.isBlockingRender = false;
    this.routeAction = ''; // forward back replace refresh
    this.state = {
      path: RouteUtil.getPathFromUrl(),
    };
  }

  setRouteLeaveHook = (pageInstance, cb) => {
    this.currentLeaveHookInfo = {
      cb,
      pageInstance,
    };
  }

  _renderByPath = (toURLInfo) => {
    this.setState({
      path: RouteUtil.getPathFromUrl(),
    });
    this.fromURLInfo = toURLInfo;
  }

  render() {
    const { config } = this.props;
    const { path } = this.state;
    const GlobalPage = config.pages['/'];
    const route = <Route path={path} config={config} />;
    if (GlobalPage) {
      return <GlobalPage>{route}</GlobalPage>;
    }
    return route;
  }
}
