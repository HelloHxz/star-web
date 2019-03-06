import React from 'react';

class Panel extends React.Component {
  getSize = (position, parent) => {
    const {
      sizeMark,
    } = this.props;
    const { layoutInfo } = parent;
    if (!layoutInfo[position]) {
      return 0;
    }
    if (!layoutInfo[position][sizeMark]) {
      layoutInfo[position][sizeMark] = 60;
    }
    return layoutInfo[position][sizeMark];
  }

  getStatus = (position, parent) => {
    if (!parent.layoutInfo[position]) {
      return null;
    }
    return parent.layoutInfo[position].status;
  }

  getStyle = () => {
    const {
      firstBoxMark, lastBoxMark, sizeMark, style,
    } = this.props;
    const cloneStyle = Object.assign({}, style || {});
    const { position, parent } = this.props;
    const firstBoxStatus = this.getStatus(firstBoxMark, parent);
    const lastBoxStatus = this.getStatus(lastBoxMark, parent);
    const firstBoxSize = this.getSize(firstBoxMark, parent);
    const lastBoxSize = this.getSize(lastBoxMark, parent);
    delete cloneStyle.position;
    delete cloneStyle[lastBoxMark];
    delete cloneStyle.height;
    delete cloneStyle.width;
    delete cloneStyle[firstBoxMark];
    if (position === firstBoxMark) {
      if (firstBoxStatus === 'slidehide') {
        cloneStyle[firstBoxMark] = (0 - parseInt(firstBoxSize, 0));
      } else {
        cloneStyle[firstBoxMark] = 0;
      }
      cloneStyle[sizeMark] = firstBoxSize;
    } else if (position === 'middle') {
      if (firstBoxStatus === 'popshow' || firstBoxStatus === 'pophide' || firstBoxStatus === 'slidehide') {
        cloneStyle[firstBoxMark] = 0;
      } else {
        cloneStyle[firstBoxMark] = firstBoxSize;
      }
      if (lastBoxStatus === 'popshow' || lastBoxStatus === 'pophide' || lastBoxStatus === 'slidehide') {
        cloneStyle[lastBoxMark] = 0;
      } else {
        cloneStyle[lastBoxMark] = lastBoxSize;
      }
    } else if (position === lastBoxMark) {
      if (lastBoxStatus === 'slidehide') {
        cloneStyle[lastBoxMark] = (0 - parseInt(lastBoxSize, 10));
      } else {
        cloneStyle[lastBoxMark] = 0;
      }
      cloneStyle[sizeMark] = lastBoxSize;
    }
    return cloneStyle;
  }

  render() {
    const { boxType } = this.props;
    const {
      position, parent, className, children,
    } = this.props;
    const status = this.getStatus(position, parent);
    const classNameArr = [`star-${boxType}-panel`, `star-${boxType}-panel-${position}${status ? `-${status}` : ''}`];
    if (position === 'middle') {
      const firstBoxStatus = this.getStatus(this.firstBoxMark, parent);
      const lastBoxStatus = this.getStatus(this.lastBoxMark, parent);
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
