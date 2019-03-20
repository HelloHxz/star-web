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

  onItemClick = (e) => {
    const {
      root, data,
    } = this.props;
    const { onItemClick } = root.props;
    if (onItemClick) {
      onItemClick({
        item: this,
        data,
        e,
      });
    }
  }

  render() {
    const {
      data, level, root,
    } = this.props;
    const { open } = this.state;
    const commonProps = {
      level,
      root,
    };
    const sectionHeaderProps = {
      ...commonProps,
      data,
    };

    if (data.children && data.children.length > 0) {
      return (
        <Fragment>
          <SectionHeader
            {...sectionHeaderProps}
            onClick={this.sectionHeaderClick.bind(this)}
          />
          <SectionList
            {...commonProps}
            open={open}
            data={data.children}
          />
        </Fragment>
      );
    }
    return (
      <SectionHeader
        {...sectionHeaderProps}
        onClick={this.onItemClick.bind(this)}
      />
    );
  }
}


export default TreeItem;
