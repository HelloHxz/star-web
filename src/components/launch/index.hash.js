import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router';
import RouterUtil from '../utils/routerUtil';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    const { config } = props;
    RouterUtil.routerCore = this;
    RouterUtil.config = config;
    this.state = {
      path: RouterUtil.getPathFromUrl(),
    };
    this.init();
  }

  init = () => {
    window.onhashchange = () => {
      this.setState({
        path: RouterUtil.getPathFromUrl(),
      });
    };
  }

  go = (path, params) => {
    window.location.hash = RouterUtil.combinePathAndParams(path, params);
  }

  render() {
    const { config } = this.props;
    const { path } = this.state;
    return (
      <Router path={path} config={config} />
    );
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<Entry config={config} />, rootDom || document.body);
};
