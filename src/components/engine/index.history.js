import React from 'react';
import ReactDOM from 'react-dom';
import Route from '../route';
import RouteUtil from '../utils/routeUtil/routeUtil';

class HistoryEngine extends React.Component {
  constructor(props) {
    super(props);
    const { config } = props;
    RouteUtil.routeCore = this;
    RouteUtil.config = config;
    this.state = {
      path: RouteUtil.getPathFromUrl(),
    };
    this.init();
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
    return (
      <Route path={path} config={config} />
    );
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<HistoryEngine config={config} />, rootDom || document.body);
};
