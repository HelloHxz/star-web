import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button, Input, Router, Launch,
} from 'star-web';
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

// const router = {
//   home: require('./demo/home/pages/home/page.js'),
//   'other/:id': require('./demo/home/pages/home/page.js'),
//   'page1/:id?': require('./demo/home/pages/home/page.js'),
// };

const Index = () => {
  return (
    <div>
      <Router />
      <h1>
        {Config.title}
      </h1>
      <ThemeBlocks />
      <Button />
      <Input />
      <div
        className="test-theme-background"
        style={{ height: 30 }}
      />
    </div>
  );
};


// Launch({
//   root: document.getElementById('star-root-id'),
//   pages: {
//   },
// });


ReactDOM.render(<Index />, document.getElementById('star-root-id'));
