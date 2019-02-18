import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Config from './config';
import Button from '../../src/components/button';
import Input from '../../src/components/input';

const pageFactory = {};
// 只是遍历二级目录
const context = require.context('./pages', true, /^\.\/\w*\/page.js$/);
const pagePathsList = context.keys();
console.log(pagePathsList);
for (let i = 0, j = pagePathsList.length; i < j; i += 1) {
  const pagePath = pagePathsList[i];
  const pagePathArr = pagePath.split('/');
  pagePathArr.splice(0, 1);
  const pageName = pagePathArr[0];
  pageFactory[pageName] = context(pagePath).default;
}
const Index = () => {
  return (
    <div>
      <Button />
      <Input />
      {Config.title}
    </div>
  );
};


ReactDOM.render(<Index />, document.getElementById('star-root-id'));
