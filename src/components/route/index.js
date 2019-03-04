import React from 'react';
import RouteUtil from './routeUtil/routeUtil';

export default class Route extends React.Component {
  render() {
    const { path } = this.props;
    const { remainPath, PageClass } = RouteUtil._parsePath(path);
    return (<PageClass path={remainPath} />);
  }
}
