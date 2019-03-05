import React from 'react';
import { Utils } from 'star-web';
import './index.less';

class ListPage extends React.Component {
  componentDidMount = () => {
    Utils.route.setRouteLeaveHook(this, (params) => {
      console.log('>>>>>>>>>>>>>>>>>>>');
      console.log(Utils.route.match());
      params.ok(); // params.cancel
    });
  }

  render() {
    return (<div>List</div>);
  }
}

export default ListPage;
