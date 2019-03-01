import React from 'react';
import { Route, Utils } from 'star-web';
import ThemeBlocks from '../../theme';

class DashBoard extends React.Component {
  go = () => {
    Utils.route.push('dashboard/other', { id: 12, url: 'http://www.xx.com/23/12?params=参数&p=1', name: '参数?#@' });
  }

  render() {
    return (
      <div>
        DashBoard
        <ThemeBlocks />
        <div
          className="test-theme-background"
          style={{ height: 30 }}
        />
        <button type="button" onClick={this.go.bind(this)}>跳转 dashboard/other</button>
        <Route {...this.props} />
      </div>
    );
  }
}

export default DashBoard;
