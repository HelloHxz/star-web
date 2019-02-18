/* eslint-disable */
const fs = require('fs');

const rmdirSync = (function () {
  function iterator(url, dirs) {
    const stat = fs.statSync(url);
    if (stat.isDirectory()) {
      dirs.unshift(url); // 收集目录
      inner(url, dirs);
    } else if (stat.isFile()) {
      fs.unlinkSync(url); // 直接删除文件
    }
  }
  function inner(path, dirs) {
    const arr = fs.readdirSync(path);
    for (var i = 0,
      el; el = arr[i++];) {
      iterator(`${path}/${el}`, dirs);
    }
  }
  return function (dir, cb) {
    cb = cb
    || function () {};
    const dirs = [];

    try {
      iterator(dir, dirs);
      for (var i = 0,
        el; el = dirs[i++];) {
        fs.rmdirSync(el); // 一次性删除所有收集到的目录
      }
      cb();
    } catch (e) { // 如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
      e.code === 'ENOENT' ? cb() : cb(e);
    }
  };
}());

module.exports.rmdirSync = rmdirSync;