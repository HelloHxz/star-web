import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router';

class Entry extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { config } = this.props;
    const { path } = this.state;
    return (
      <Router path={path} config={config} params="" />
    );
  }
}

export default (config) => {
  ReactDOM.render(<Entry config={config} />, config.root || document.body);
};
