import React from 'react';
import TreeBase from '../treeBase';
import Utils from '../utils';
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

  selectedClass = () => {

  }

  beforeRenderItem = (params) => {
    const { props, item } = params;
    const { data } = item.props;
    const { selectedKeys } = this.props;
    let _selectedKeys = selectedKeys;
    if (selectedKeys) {
      if (!Utils.object.isArray(selectedKeys)) {
        _selectedKeys = [selectedKeys];
      }
    }
    if (_selectedKeys.indexOf(data.key) >= 0) {
      props.className = ['star-menu-item-selected', props.className].join(' ');
    }
  }

  render = () => {
    return (
      <TreeBase
        className="star-menu"
        beforeRenderItem={this.beforeRenderItem.bind(this)}
        itemClass={this.itemClass.bind(this)}
        selectedClass={this.selectedClass.bind(this)}
        {...this.props}
      />
    );
  }
}

export default Menu;
