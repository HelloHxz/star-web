import React from 'react';
import { Router, Utils } from 'star-web';
import ThemeBlocks from '../../theme';

class Home extends React.Component {
  go = () => {
    Utils.router.go('dashboard/other', { id: 12, url: 'http://www.xx.com/23/12?params=参数&p=1', name: '参数?#@' });
  }

  render() {
    return (
      <div>
          Home
        <ThemeBlocks />
        <div
          className="test-theme-background"
          style={{ height: 30 }}
        />
        <input type="button" value="跳转" onClick={this.go.bind(this)} />
        <Router {...this.props} />
      </div>
    );
  }
}

export default Home;
