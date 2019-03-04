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
    this.fromURLInfo = {};
    this.toURLInfo = {};
    this.routeAction = ''; // forward back replace refresh
    this.state = {
      path: RouteUtil.getPathFromUrl(),
    };
    this.init();
  }

  init = () => {
    window.onhashchange = () => {
      this.setState({
        path: RouteUtil.getPathFromUrl(),
      });
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
