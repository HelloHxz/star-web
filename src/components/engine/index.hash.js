import React from 'react';
import ReactDOM from 'react-dom';
import Route from '../route';
import RouteUtil from '../route/routeUtil/routeUtil';

class HashEngine extends React.Component {
  constructor(props) {
    super(props);
    const { config } = props;
    RouteUtil.registerEngine({
      engine: this,
      config,
    });
    this.fromURLInfo = RouteUtil.getUrlInfo();
    this.blockingToRender = false;
    this.routeAction = ''; // forward back replace refresh
    this.state = {
      path: RouteUtil.getPathFromUrl(),
    };
    this.init();
  }

  setRouteLeaveHook = (pageInstance, cb) => {
    // const { routeWrapper } = pageInstance.props;
    this.currentLeaveHookInfo = {
      cb,
      pageInstance,
    };
  }

  removeLeaveHook = () => {
    this.currentLeaveHookInfo = null;
  }

  init = () => {
    window.onhashchange = () => {
      if (this.blockingToRender) {
        this.blockingToRender = false;
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
              this.renderByPath(toURLInfo);
            },
            cancel: () => {
              if (this.routeAction === 'back') {
                this.blockingToRender = true;
                window.history.go(1);
              } else if (this.routeAction === 'forward') {
                this.blockingToRender = true;
                window.history.go(-1);
              }
              // blocking
            },
          });
        } else {
          this.renderByPath(toURLInfo);
        }
      } else {
        this.renderByPath(toURLInfo);
      }
    };
  }

  renderByPath = (toURLInfo) => {
    this.setState({
      path: RouteUtil.getPathFromUrl(),
    });
    this.fromURLInfo = toURLInfo;
  }

  push = (path, query) => {
    window.location.hash = RouteUtil.combinePathAndQuery(path, query);
  }

  replace = (path, query) => {
    window.location.hash = RouteUtil.combinePathAndQuery(path, query);
  }

  render() {
    const { config } = this.props;
    const { path } = this.state;
    return (
      <Route path={path} config={config} />
    );
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<HashEngine config={config} />, rootDom || document.body);
};
