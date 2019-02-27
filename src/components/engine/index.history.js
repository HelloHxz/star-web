import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router';
import RouterUtil from '../utils/routerUtil';

class Engine extends React.Component {
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
    window.onpopstate = () => {
      this.setState({
        path: RouterUtil.getPathFromUrl(),
      });
    };
  }

  go = (path) => {
    // todo isSamePath And Params return
    window.history.pushState({}, '', `${window.location.href.split('.html')[0]}.html/${path}`);
    setTimeout(() => {
      this.setState({
        path: RouterUtil.getPathFromUrl(),
      });
    }, 10);
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
  ReactDOM.render(<Engine config={config} />, rootDom || document.body);
};
