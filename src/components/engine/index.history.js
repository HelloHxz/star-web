import React from 'react';
import ReactDOM from 'react-dom';
import Route from '../route';
import RouteUtil from '../route/routeUtil/routeUtil';

class HistoryEngine extends React.Component {
  constructor(props) {
    super(props);
    const { config } = props;
    RouteUtil.registerEngine({
      engine: this,
      config,
    });
    this.fromURLInfo = {};
    this.toURLInfo = {};
    this.routeAction = ''; // forward back replace refresh
    this.state = {
      path: RouteUtil.getPathFromUrl(),
    };
    this.init();
  }

  setRouteLeaveHook = (pageInstance, cb) => {
    this.currentLeaveHookInfo = {
      cb,
      pageInstance,
    };
  }

  init = () => {
    window.onpopstate = () => {
      this.setState({
        path: RouteUtil.getPathFromUrl(),
      });
    };
  }

  push = (path, query) => {
    // todo isSamePath And query return
    window.history.pushState({}, null, RouteUtil.combinePathAndQuery(path, query));
    setTimeout(() => {
      this.setState({
        path: RouteUtil.getPathFromUrl(),
      });
    }, 10);
  }

  replace = (path, query) => {
    window.history.replaceState({}, null, RouteUtil.combinePathAndQuery(path, query));
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

export default (config, rootDom) => {
  ReactDOM.render(<HistoryEngine config={config} />, rootDom || document.body);
};
