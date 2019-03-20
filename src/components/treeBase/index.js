import React from 'react';
import SectionList from './sectionList';
import './index.less';

class TreeBase extends React.Component {
  render() {
    const { className } = this.props;
    const p = {};
    if (className) {
      p.className = className;
    }
    return (
      <div
        {...p}
        style={{
          width: '100%', height: '100%', overflow: 'auto', display: 'inline-block',
        }}
      >
        <SectionList {...this.props} root={this} level={0} />
      </div>
    );
  }
}

export default TreeBase;
