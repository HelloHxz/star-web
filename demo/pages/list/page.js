import React from 'react';
import { Utils } from 'star-web';
import './index.less';

class ListPage extends React.Component {
  componentDidMount = () => {
    console.log('>>>>>>>>>>>>>>>>>>>');
    console.log(Utils.route.match());
    Utils.route.setRouteLeaveHook(this, (params) => {
      const re = window.confirm('你确定要离开List页面吗？');
      if (re) {
        params.ok(); // params.cancel
      } else {
        params.cancel(); // params.cancel
      }
    });
  }

  render() {
    return (<div>List</div>);
  }
}

export default ListPage;
