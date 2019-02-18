import React from 'react';
import './index.less';

class Button extends React.Component {
  render() {
    const classNames = ['star-btn'];
    return (<button className={classNames.join(' ')} type="button">按钮</button>);
  }
}

export default Button;
