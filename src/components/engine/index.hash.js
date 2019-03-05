import React from 'react';
import ReactDOM from 'react-dom';
import EnginBase from './engineBase';
import RouteUtil from '../route/routeUtil/routeUtil';

class HashEngine extends EnginBase {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    window.onhashchange = () => {
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
    };
  }

  push = (path, query) => {
    window.location.hash = RouteUtil.combinePathAndQuery(path, query);
  }

  replace = (path, query) => {
    window.location.hash = RouteUtil.combinePathAndQuery(path, query);
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<HashEngine config={config} />, rootDom || document.body);
};
