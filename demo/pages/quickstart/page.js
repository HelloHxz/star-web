import React from 'react';
import { Utils } from 'star-web';

class QuickStart extends React.Component {
  constructor(props) {
    super(props);
    console.log(Utils.route.match());
  }

  render() {
    return (
      <div>
        QuickStart
      </div>
    );
  }
}

export default QuickStart;
