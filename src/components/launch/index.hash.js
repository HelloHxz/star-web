import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router';
import RouterUtil from '../utils/routerUtil';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    RouterUtil.routerCore = this;
    this.defaultPath = 'dashboard/list';
    this.state = {
      path: this.defaultPath,
    };
    this.init();
  }

  init = () => {
    window.onhashchange = () => {
      const hash = window.location.hash.split('?')[0];
      this.setState({
        path: hash.substring(1).length === 0
          ? this.defaultPath : hash.substring(1),
      });
    };
  }

  go = (path, params) => {
    let _path = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    const paramsArr = [];
    const _params = params || {};
    // eslint-disable-next-line
    for (const key in _params) {
      paramsArr.push(`${key}=${encodeURIComponent(_params[key])}`);
    }
    let hash = `#${_path}`;
    if (paramsArr.length > 0) {
      hash = `${hash}?${paramsArr.join('&')}`;
    }
    window.location.hash = hash;
  }

  render() {
    const { config } = this.props;
    const { path } = this.state;
    return (
      <Router path={path} config={config} params="" />
    );
  }
}

export default (config, rootDom) => {
  ReactDOM.render(<Entry config={config} />, rootDom || document.body);
};
