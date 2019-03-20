export default class ObjectUtil {
  static isJson = (obj) => {
    return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
  }

  static isJsonStr = (str) => {
    if (typeof (str) !== 'string') {
      return false;
    }
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  static isArray = (obj) => {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
  }
}
