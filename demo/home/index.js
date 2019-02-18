import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Config from './config';

const Index = () => {
  const a = {
    ...{ b: 2 },
    ...{ c: 2 },
  };
  Config.init();
  return <div className="test">{Config.title}</div>;
};


ReactDOM.render(<Index />, document.getElementById('star-root-id'));
