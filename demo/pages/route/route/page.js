import React from 'react';
import { Utils } from 'star-web';

class RoutePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(Utils.route.match());
  }

  render() {
    return (
      <div>
        RoutePage
      </div>
    );
  }
}

export default RoutePage;
