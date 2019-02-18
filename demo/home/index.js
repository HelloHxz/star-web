import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const Index = () => {
  return <div className='test'>Hello Star Web!</div>;
};

ReactDOM.render(<Index />, document.getElementById('star-root-id'));