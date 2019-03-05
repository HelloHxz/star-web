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
      const toURLInfo = RouteUtil.getUrlInfo();
      console.log('from>>>>>>>>>>>');
      console.log(this.fromURLInfo);
      console.log('to>>>>>>>>>>>');
      console.log(toURLInfo);
      if (this.currentLeaveHookInfo) {
        this.currentLeaveHookInfo.cb({
          ok: () => {
            this.setState({
              path: RouteUtil.getPathFromUrl(),
            });
            this.fromURLInfo = toURLInfo;
          },
          cancel: () => {
            // blocking
          },
        });
      } else {
        this.setState({
          path: RouteUtil.getPathFromUrl(),
        });
        this.fromURLInfo = toURLInfo;
      }
    };
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
