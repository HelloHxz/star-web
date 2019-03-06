import React from 'react';

class Panel extends React.Component {
  getSize = (position, parent) => {
    const {
      widtOrHeight,
    } = this.props;
    const { layoutInfo } = parent;
    if (!layoutInfo[position]) {
      return 0;
    }
    if (!layoutInfo[position][widtOrHeight]) {
      layoutInfo[position][widtOrHeight] = 60;
    }
    return layoutInfo[position][widtOrHeight];
  }

  getStatus = (position, parent) => {
    if (!parent.layoutInfo[position]) {
      return null;
    }
    return parent.layoutInfo[position].status;
  }

  getStyle = () => {
    const {
      firstPanelPos, lastPanelPos, widtOrHeight, style,
    } = this.props;
    const cloneStyle = Object.assign({}, style || {});
    const { position, parent } = this.props;
    const firstBoxStatus = this.getStatus(firstPanelPos, parent);
    const lastBoxStatus = this.getStatus(lastPanelPos, parent);
    const firstBoxSize = this.getSize(firstPanelPos, parent);
    const lastBoxSize = this.getSize(lastPanelPos, parent);
    delete cloneStyle.position;
    delete cloneStyle[lastPanelPos];
    delete cloneStyle.height;
    delete cloneStyle.width;
    delete cloneStyle[firstPanelPos];
    if (position === firstPanelPos) {
      if (firstBoxStatus === 'slidehide') {
        cloneStyle[firstPanelPos] = (0 - parseInt(firstBoxSize, 0));
      } else {
        cloneStyle[firstPanelPos] = 0;
      }
      cloneStyle[widtOrHeight] = firstBoxSize;
    } else if (position === 'middle') {
      if (firstBoxStatus === 'popshow' || firstBoxStatus === 'pophide' || firstBoxStatus === 'slidehide') {
        cloneStyle[firstPanelPos] = 0;
      } else {
        cloneStyle[firstPanelPos] = firstBoxSize;
      }
      if (lastBoxStatus === 'popshow' || lastBoxStatus === 'pophide' || lastBoxStatus === 'slidehide') {
        cloneStyle[lastPanelPos] = 0;
      } else {
        cloneStyle[lastPanelPos] = lastBoxSize;
      }
    } else if (position === lastPanelPos) {
      if (lastBoxStatus === 'slidehide') {
        cloneStyle[lastPanelPos] = (0 - parseInt(lastBoxSize, 10));
      } else {
        cloneStyle[lastPanelPos] = 0;
      }
      cloneStyle[widtOrHeight] = lastBoxSize;
    }
    return cloneStyle;
  }

  render() {
    const { boxType } = this.props;
    const {
      position, parent, className, children, firstPanelPos, lastPanelPos,
    } = this.props;
    const status = this.getStatus(position, parent);
    const classNameArr = [`star-${boxType}-panel`, `star-${boxType}-panel-${position}${status ? `-${status}` : ''}`];
    if (position === 'middle') {
      const firstBoxStatus = this.getStatus(firstPanelPos, parent);
      const lastBoxStatus = this.getStatus(lastPanelPos, parent);
      if (firstBoxStatus === 'popshow' || firstBoxStatus === 'pophide') {
        classNameArr.push(`star-${boxType}-transition-top-none`);
      }
      if (lastBoxStatus === 'popshow' || lastBoxStatus === 'pophide') {
        classNameArr.push(`star-${boxType}-transition-bottom-none`);
      }
    }
    if (className) {
      classNameArr.push(className);
    }
    return (
      <div style={this.getStyle()} className={classNameArr.join(' ')}>
        {children}
      </div>
    );
  }
}

export default Panel;
