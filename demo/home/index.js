import {
  Engine,
} from 'star-web';
import './index.less';

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

Engine({
  root: 'dashboard/list',
  pages: {
    dashboard: require('./pages/dashboard/page.js').default,
    list: require('./pages/list/page.js').default,
    other: require('./pages/other/page.js').default,
    page1: require('./pages/page1/page.js').default,
  },
}, document.getElementById('star-root-id'));
