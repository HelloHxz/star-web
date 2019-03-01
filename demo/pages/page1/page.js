import React from 'react';
import { Route } from 'star-web';

class Page1 extends React.Component {
  render() {
    return (
      <div>
        Page1
        <Route {...this.props} />
      </div>
    );
  }
}

export default Page1;
