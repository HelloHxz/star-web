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

  _urlChange = () => {
    if (this.isBlockingRender) {
      this.isBlockingRender = false;
      return;
    }
    const toURLInfo = RouteUtil.getUrlInfo();
    if (this.fromURLInfo.routeKey > toURLInfo.routeKey) {
      this.routeAction = 'back';
    } else {
      this.routeAction = 'forward';
    }
    if (this.currentLeaveHookInfo) {
      const registerHookRouteKey = this.currentLeaveHookInfo.pageInstance.props.urlInfo.routeKey;
      if (registerHookRouteKey === this.fromURLInfo.routeKey) {
        this.currentLeaveHookInfo.cb({
          ok: () => {
            this._renderByPath(toURLInfo);
          },
          cancel: () => {
            // 修复URL
            this.isBlockingRender = true;
            if (this.routeAction === 'back') {
              window.history.go(1);
            } else if (this.routeAction === 'forward') {
              window.history.go(-1);
            }
          },
        });
      } else {
        this._renderByPath(toURLInfo);
      }
    } else {
      this._renderByPath(toURLInfo);
    }
  }

  _renderByPath = (toURLInfo) => {
    this.setState({
      path: RouteUtil.getPathFromUrl(),
    });
    this.fromURLInfo = toURLInfo;
    // eslint-disable-next-line
    for (const key in RouteUtil._urlChangeEvents) {
      const cb = RouteUtil._urlChangeEvents[key];
      try {
        cb(toURLInfo);
      } catch (e) {
        RouteUtil.removeUrlChangeListener(key);
      }
    }
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
