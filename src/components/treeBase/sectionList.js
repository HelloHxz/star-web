import React from 'react';
import Section from './section';

class TreeGroup extends React.Component {
  render() {
    const { data, level } = this.props;
    const realData = data || [];
    const lists = [];
    for (let i = 0, j = realData.length; i < j; i += 1) {
      const itemData = realData[i];
      lists.push(<Section level={level + 1} data={itemData} key={itemData.key || i} />);
    }
    return (
      <div data-level={level}>{lists}</div>
    );
  }
}

export default TreeGroup;
