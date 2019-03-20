import React from 'react';

class NotFoundPage extends React.Component {
  render() {
    const {
      routeUtil, urlInfo, path, pageName,
    } = this.props;
    const { routeConfig } = routeUtil;
    const { render404Page } = routeConfig;
    if (render404Page) {
      return render404Page({
        urlInfo,
        pageName,
        path,
      });
    }
    return (
      <div>
        页面丢了
      </div>
    );
  }
}

export default NotFoundPage;
