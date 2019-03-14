import React from 'react';
import SectionList from './sectionList';
import './index.less';

class TreeBase extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <SectionList {...this.props} level={0} />
      </div>
    );
  }
}

export default TreeBase;
