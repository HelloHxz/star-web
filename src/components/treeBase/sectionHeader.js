import React from 'react';

class TreeItem extends React.Component {
  clickMethod = (e) => {
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    const {
      data, onClick, level, root,
    } = this.props;
    const { firstLevelOffset, itemClass, offset } = root.props;
    let _offset = offset;
    const p = {};
    if (Number.isNaN(Number(_offset))) {
      _offset = 20;
    }
    let paddingLeft = level * _offset;
    if (onClick) {
      p.onClick = this.clickMethod.bind(this);
    }
    if (typeof (itemClass) === 'function') {
      p.className = itemClass({ item: this }) || '';
    }
    p.style = {};
    if (!(Number.isNaN(Number(firstLevelOffset)))) {
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
