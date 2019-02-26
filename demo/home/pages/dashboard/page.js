import React from 'react';
import { Router } from 'star-web';
import ThemeBlocks from '../../theme';

class Home extends React.Component {
  go = () => {
    window.location.hash = '#dashboard/other?es=asd';
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
