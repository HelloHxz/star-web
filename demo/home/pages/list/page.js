import React from 'react';
import { Utils } from 'star-web';
import './index.less';

class ListPage extends React.Component {
  componentDidMount = () => {
    console.log(Utils.router.match());
  }

  render() {
    return (<div>List</div>);
  }
}

export default ListPage;
