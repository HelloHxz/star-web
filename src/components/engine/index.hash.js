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
      this._urlChange();
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
