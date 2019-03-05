import React from 'react';
import { Utils } from 'star-web';

class Other extends React.Component {
  constructor(props) {
    super(props);
    console.log(Utils.route.match());
  }

  componentDidMount = () => {
    Utils.route.setRouteLeaveHook(this, (params) => {
      const re = window.confirm('你确定要离开Other页面吗？');
      if (re) {
        params.ok(); // params.cancel
      } else {
        params.cancel(); // params.cancel
      }
    });
  }

  go = () => {
    Utils.route.push('dashboard/page1/list');
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
