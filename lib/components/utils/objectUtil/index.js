"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectUtil = function ObjectUtil() {
  _classCallCheck(this, ObjectUtil);
};

exports.default = ObjectUtil;

ObjectUtil.isJson = function (obj) {
  return _typeof(obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
};

ObjectUtil.isJsonStr = function (str) {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    var obj = JSON.parse(str);

    if (_typeof(obj) === 'object' && obj) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};