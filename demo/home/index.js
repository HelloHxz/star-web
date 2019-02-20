import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input } from 'star-web';
import './index.less';
import ThemeBlocks from './theme';
import Config from './config';

// const pageFactory = {};
// // 只是遍历二级目录
// const context = require.context('./pages', true, /^\.\/\w*\/page.js$/);
// const pagePathsList = context.keys();
// console.log(pagePathsList);
// for (let i = 0, j = pagePathsList.length; i < j; i += 1) {
//   const pagePath = pagePathsList[i];
//   const pagePathArr = pagePath.split('/');
//   pagePathArr.splice(0, 1);
//   const pageName = pagePathArr[0];
//   pageFactory[pageName] = context(pagePath).default;
// }

const Index = () => {
  return (
    <div>
      <h1>{Config.title}</h1>
      <ThemeBlocks />
      <Button />
      <Input />
    </div>
  );
};


ReactDOM.render(<Index />, document.getElementById('star-root-id'));
