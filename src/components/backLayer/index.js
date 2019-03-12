import React from 'react';
import './index.less';
import ComponentUtil from '../utils/componentUtil';

export default class BackLayer extends React.Component {
  onClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  render() {
    const {
      show, style, className, onClick,
    } = this.props;
    const status = show ? 'show' : 'hide';
    if (status === 'hide' && this.preStatus !== 'show') {
      return null;
    }
    this.preStatus = status;
    const positionMode = ComponentUtil.getConfig('position', this.props);
    const classNameArr = ['star-bk-layer', `star-bk-layer-${positionMode} star-bk-layer-${status}`];
    const p = {};
    if (style) {
      p.style = style;
    }
    if (className) {
      classNameArr.push(className);
    }
    if (onClick) {
      p.onClick = this.onClick.bind(this);
    }
    return (<div {...p} className={classNameArr.join(' ')} />);
  }
}
