"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sourceMap = {
  'btn-type': ['default', 'primary', 'hover'],
  size: ['default', 'sm', 'lg'],
  position: ['fixed', 'absolute'],
  direction: ['right', 'top', 'bottom', 'left', 'center']
};
var translateKeys = null;

var ComponentUtil =
/*#__PURE__*/
function () {
  function ComponentUtil() {
    _classCallCheck(this, ComponentUtil);
  }

  _createClass(ComponentUtil, null, [{
    key: "getTransitionKeys",
    value: function getTransitionKeys() {
      if (translateKeys) {
        return translateKeys;
      }

      var testStyle = document.createElement('DIV').style;
      var me = {};

      if ('-webkit-transform' in testStyle) {
        me.transitionend = 'webkitTransitionEnd';
        me.transform = 'WebkitTransform';
        me.cssTransform = '-webkit-transform';
        me.transition = 'WebkitTransition';
      } else if ('-ms-transform' in testStyle) {
        me.transitionend = 'msTransitionEnd';
        me.transform = 'msTransform';
        me.cssTransform = '-ms-transform';
        me.transition = 'msTransition';
      } else {
        me.transitionend = 'transitionend';
        me.transform = 'transform';
        me.cssTransform = 'transform';
        me.transition = 'transition';
      }

      translateKeys = me;
      return me;
    }
  }]);

  return ComponentUtil;
}();

ComponentUtil.getConfig = function (key, props, defaultValue) {
  var rkey = key;
  var source = sourceMap[key];
  var rkeyArr = rkey.split('-');

  if (rkeyArr.length === 2) {
    // eslint-disable-next-line
    rkey = rkeyArr[1];
  }

  var value = props[rkey] || '';

  if (source.indexOf(value) < 0) {
    return defaultValue || source[0];
  }

  return value;
};

var _default = ComponentUtil;
exports.default = _default;