import React from 'react';
import Section from './section';

class TreeGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: !!props.open,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { open } = nextProps;
    const nextOpen = !!open;
    // eslint-disable-next-line
    if (nextOpen !== this.state.open) {
      this.toggle(nextOpen);
    }
  }

  toggle = (isOpen) => {
    if (this.timeid || this.timeid2) {
      return;
    }
    const openState = !!isOpen;
    if (!openState) {
      // 关闭的时候 从auto变成固定的高度 才有动画
      this.listOuterWrapper.style.overflow = 'hidden';
      this.listOuterWrapper.style.height = `${this.listInnerWrapper.offsetHeight}px`;
    }
    this.timeid = setTimeout(() => {
      this.timeid = null;
      this.setState({
        open: openState,
      }, () => {
        const { open } = this.state;
        if (open) {
          this.timeid2 = setTimeout(() => {
            this.timeid2 = null;
            this.listOuterWrapper.style.height = 'auto';
            this.listOuterWrapper.style.overflow = 'visible';
          }, 210);
        } else {
          this.listOuterWrapper.style.height = '0px';
        }
      });
    }, 50);
  }

  outerLoad = (listOuterWrapper) => {
    this.listOuterWrapper = listOuterWrapper;
  }

  innerLoad = (listInnerWrapper) => {
    this.listInnerWrapper = listInnerWrapper;
  }

  render() {
    const {
      data, level, offset, firstLevelOffset, itemClass, selectedKey, onItemClick,
    } = this.props;
    const { open } = this.state;
    const classArr = ['star-treebase-list'];
    const realData = data || [];
    const outerStyle = {};
    const lists = [];
    if (level !== 0) {
      if (open) {
        if (this.listInnerWrapper) {
          outerStyle.height = this.listInnerWrapper.offsetHeight;
          outerStyle.overflow = 'hidden';
        }
      } else {
        outerStyle.height = 0;
        outerStyle.overflow = 'hidden';
      }
    }
    for (let i = 0, j = realData.length; i < j; i += 1) {
      const itemData = realData[i];
      lists.push(
        <Section
          firstLevelOffset={firstLevelOffset}
          offset={offset}
          onItemClick={onItemClick}
          selectedKey={selectedKey}
          itemClass={itemClass}
          level={level + 1}
          data={itemData}
          key={itemData.key || i}
        />
      );
    }
    return (
      <div style={outerStyle} ref={this.outerLoad.bind(this)} className={classArr.join(' ')} data-level={level}>
        <div ref={this.innerLoad.bind(this)}>
          {lists}
        </div>
      </div>
    );
  }
}

export default TreeGroup;
