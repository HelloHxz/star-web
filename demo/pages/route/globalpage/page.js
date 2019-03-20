import React from 'react';
import { Utils } from 'star-web';

class GlobalPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(Utils.route.match());
  }

  render() {
    return (
      <div>
        GlobalPage
      </div>
    );
  }
}

export default GlobalPage;
