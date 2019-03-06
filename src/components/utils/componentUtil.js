
const sourceMap = {
  'btn-type': ['default', 'primary', 'hover'],
  size: ['default', 'sm', 'lg'],
  position: ['fixed', 'absolute'],
  direction: ['right', 'top', 'bottom', 'left', 'center'],
};

let translateKeys = null;
class ComponentUtil {
    static getConfig = (key, props, defaultValue) => {
      let rkey = key;
      const source = sourceMap[key];
      const rkeyArr = rkey.split('-');
      if (rkeyArr.length === 2) {
        // eslint-disable-next-line
        rkey = rkeyArr[1];
      }
      const value = props[rkey] || '';
      if (source.indexOf(value) < 0) {
        return defaultValue || source[0];
      }
      return value;
    }

    static getTransitionKeys() {
      if (translateKeys) {
        return translateKeys;
      }
      const testStyle = document.createElement('DIV').style;
      const me = {};
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
}


export default ComponentUtil;
