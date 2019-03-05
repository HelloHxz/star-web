import React from 'react';
import RouteUtil from './routeUtil/routeUtil';

export default class Route extends React.Component {
  routePageInit = () => {
  }

  componentWillUnmount = () => {
    // RouteUtil.removeLeaveHook();
  }

  render() {
    const { path } = this.props;
    const { remainPath, PageClass } = RouteUtil._parsePath(path);
    return (
      <PageClass
        routerWrapper={this}
        ref={(ins) => { this.routePageInit(ins); }}
        path={remainPath}
        urlInfo={RouteUtil.getUrlInfo()}
      />
    );
  }
}
