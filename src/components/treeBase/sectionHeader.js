import React from 'react';

class TreeItem extends React.Component {
  clickMethod = () => {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const {
      data, onClick, offset, level, firstLevelOffset,
    } = this.props;
    let _offset = offset;
    if (Number.isNaN(_offset)) {
      _offset = 20;
    }
    const p = {};
    let paddingLeft = level * _offset;
    if (onClick) {
      p.onClick = this.clickMethod.bind(this);
    }
    p.style = {};
    if (!Number.isNaN(firstLevelOffset)) {
      if (level === 1) {
        paddingLeft = firstLevelOffset;
      } else {
        paddingLeft = (level - 1) * _offset + firstLevelOffset;
      }
    }
    p.style.paddingLeft = `${paddingLeft}px`;
    return (
      <div {...p}>
        { data.label }
      </div>
    );
  }
}


export default TreeItem;
