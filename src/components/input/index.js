import React from 'react';
import './index.less';

class Input extends React.Component {
  render() {
    const classNames = ['star-input'];
    return (<input className={classNames.join(' ')} />);
  }
}

export default Input;
