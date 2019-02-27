import React from 'react';

class HashRouter extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
  }

  getCurPageClass = () => {
    const { path, config } = this.props;
    const pathArr = path.split('/');
    const curPageName = pathArr.shift();
    return {
      Component: config.pages[curPageName],
      path: pathArr.join('/'),
    };
  }

  render() {
    const { config } = this.props;
    const PageInfo = this.getCurPageClass();
    return (<PageInfo.Component config={config} path={PageInfo.path} />);
  }
}

export default HashRouter;
