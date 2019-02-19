
const comonentsFactory = {};
// 只是遍历二级目录
const context = require.context('./src/components', true, /^\.\/\w*\/index.js$/);
const componentsPathList = context.keys();
for (let i = 0, j = componentsPathList.length; i < j; i += 1) {
  const pagePath = componentsPathList[i];
  const componentsPathArr = pagePath.split('/');
  componentsPathArr.splice(0, 1);
  let componentName = componentsPathArr[0];
  componentName = componentName.slice(0, 1).toUpperCase() + componentName.slice(1);
  comonentsFactory[componentName] = context(pagePath).default;
  module.exports[componentName] = comonentsFactory[componentName];
}
