import React from 'react';
import TreeBase from '../treeBase';
// import RouteUtil from '../route/routeUtil/routeUtil';
import './index.less';

class Menu extends React.Component {
  itemClass = (params) => {
    const { item } = params;
    const { data } = item.props;
    if (data.children && data.children.length > 0) {
      return 'star-menu-section-header';
    }
    return 'star-menu-item';
  }

  render = () => {
    return (
      <TreeBase
        className="star-menu"
        itemClass={this.itemClass.bind(this)}
        {...this.props}
      />
    );
  }
}

export default Menu;
