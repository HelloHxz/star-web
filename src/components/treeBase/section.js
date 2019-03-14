import React, { Fragment } from 'react';
import SectionList from './sectionList';
import SectionHeader from './sectionHeader';

class TreeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: !!props.open,
    };
  }

  sectionHeaderClick = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const {
      data, level, offset, firstLevelOffset,
    } = this.props;
    const { open } = this.state;
    if (data.children && data.children.length > 0) {
      return (
        <Fragment>
          <SectionHeader
            offset={offset}
            firstLevelOffset={firstLevelOffset}
            level={level}
            data={data}
            onClick={this.sectionHeaderClick.bind(this)}
          />
          <SectionList
            firstLevelOffset={firstLevelOffset}
            open={open}
            offset={offset}
            level={level}
            data={data.children}
          />
        </Fragment>
      );
    }
    return (
      <SectionHeader
        firstLevelOffset={firstLevelOffset}
        offset={offset}
        level={level}
        data={data}
      />
    );
  }
}


export default TreeItem;
