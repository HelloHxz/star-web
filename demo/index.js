import {
  Engine,
} from 'star-web';
import React from 'react';
import './index.less';

Engine({
  root: 'dashboard/about',
  pages: {
    '/': require('./pages/global/page.js').default,
    dashboard: require('./pages/dashboard/page.js').default,
    about: require('./pages/about/page.js').default,
    quickstart: require('./pages/quickstart/page.js').default,
    route: require('./pages/route/route/page.js').default,
    globalpage: require('./pages/route/globalpage/page.js').default,
    grid: require('./pages/layoutComponents/grid/page.js').default,
  },
  render404Page: () => {
    return (<div>404！没有找到相关页面</div>);
  },
}, document.getElementById('star-root-id'));


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
