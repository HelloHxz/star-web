class RouterUtil {
  constructor() {
    this.routerCore = null;
  }

  go = (path, params) => {
    this.routerCore.go(path, params);
  }
}

export default new RouterUtil();
