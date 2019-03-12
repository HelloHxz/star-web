import React from 'react';
import SectionList from './sectionList';
import './index.less';

class TreeBase extends React.Component {
  render() {
    return (
      <div>
        <SectionList {...this.props} level={0} />
      </div>
    );
  }
}

export default TreeBase;
