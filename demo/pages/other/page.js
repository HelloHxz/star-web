import React from 'react';
import { Utils } from 'star-web';

class Other extends React.Component {
  constructor(props) {
    super(props);
    console.log(Utils.route.match());
  }

  go = () => {
    Utils.route.push('dashboard/page1/list', { data: JSON.stringify({ a: 1, url: 'http://www.xx.com/23/12?params=参数&p=1' }), name: '参数?#@' });
  }

  render() {
    return (
      <div>
        Other
        <button type="button" onClick={this.go.bind(this)}>跳转 dashboard/page1/list</button>
      </div>
    );
  }
}

export default Other;
