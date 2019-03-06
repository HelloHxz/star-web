import React from 'react';
import BackLayer from '../backLayer';
import Panel from './panel';

const statusArr = ['popshow', 'pophide', 'dock', 'slideshow', 'slidehide'];

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.boxType = props.boxType || 'hbox';
    this.layoutInfo = {};
    if (this.boxType === 'hbox') {
      this.firstPanelPos = 'left';
      this.lastPanelPos = 'right';
      this.widtOrHeight = 'width';
    } else {
      this.firstPanelPos = 'top';
      this.lastPanelPos = 'bottom';
      this.widtOrHeight = 'height';
    }
  }

  onBackLayerClick() {
    const { onBackLayerClick } = this.props;
    if (onBackLayerClick) {
      onBackLayerClick();
    }
  }

  render() {
    const {
      children, onBackLayerClick, style, className,
    } = this.props;
    if (!children) {
      return null;
    }
    const len = children.length;
    let seed = 0;
    const childrenArr = [];
    let showBk = false;
    for (let i = 0; i < len; i += 1) {
      const panel = children[i];
      if (panel.type === Panel) {
        const positions = [this.firstPanelPos, 'middle', this.lastPanelPos];
        const position = positions[seed];
        let status = null;
        if (position === this.firstPanelPos || position === this.lastPanelPos) {
          status = panel.props.status || 'dock';
          if (statusArr.indexOf(status) < 0) {
            status = 'dock';
          }
        }
        if (panel.props.status === 'popshow') {
          showBk = true;
        }
        childrenArr.push(React.cloneElement(panel, {
          position,
          key: position,
          parent: this,
          boxType: this.boxType,
          widtOrHeight: this.widtOrHeight,
          firstPanelPos: this.firstPanelPos,
          lastPanelPos: this.lastPanelPos,
        }));
        const propsStyle = panel.props.style || {};
        this.layoutInfo[position] = {
          status,
        };
        this.layoutInfo[position][this.widtOrHeight] = propsStyle[this.widtOrHeight];
        if (childrenArr.length === 3) {
          break;
        }
        seed += 1;
      }
    }
    if (children.length <= 1 || children.length > 3) {
      console.error(`${this.boxType}组件保证有俩个或者三个Panel子元素`);
    }

    const boxStyle = Object.assign({}, style || {});
    delete boxStyle.position;
    const backlayerProps = {};
    if (onBackLayerClick) {
      backlayerProps.onClick = this.onBackLayerClick.bind(this);
    }
    return (
      <div
        style={boxStyle}
        ref={(root) => {
          this.root = root;
        }}
        className={`star-${this.boxType} ${className || ''}`}
      >
        {childrenArr}
        <BackLayer position="absolute" {...backlayerProps} className={`star-${this.boxType}-bk`} show={showBk} />
      </div>
    );
  }
}

Box.Panel = Panel;
