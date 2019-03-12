import React, { Fragment } from 'react';
import SectionList from './sectionList';
import SectionHeader from './sectionHeader';

class TreeItem extends React.Component {
  render() {
    const { data, level } = this.props;
    if (data.children && data.children.length > 0) {
      return (
        <Fragment>
          <SectionHeader data={data} />
          <SectionList level={level} data={data.children} />
        </Fragment>
      );
    }
    return (
      <SectionHeader data={data} />
    );
  }
}


export default TreeItem;
