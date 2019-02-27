import React from 'react';
import { Router } from 'star-web';

class Page1 extends React.Component {
  render() {
    return (
      <div>
        Page1
        <Router {...this.props} />
      </div>
    );
  }
}

export default Page1;
