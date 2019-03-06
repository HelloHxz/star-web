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
}
