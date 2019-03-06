import React from 'react';
import ReactDOM from 'react-dom';
import EnginBase from './engineBase';
import RouteUtil from '../route/routeUtil/routeUtil';

class HistoryEngine extends EnginBase {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    window.onpopstate = () => {
      this._urlChange();
    };
  }

  push = (path, query) => {
    // todo isSamePath And query return
    window.history.pushState({}, null, RouteUtil.combinePathAndQuery(path, query));
    setTimeout(() => {
      this._urlChange();
    }, 6);
  }

  replace = (path, query) => {
    window.history.replaceState({}, null, RouteUtil.combinePathAndQuery(path, query));
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<HistoryEngine config={config} />, rootDom || document.body);
};
