var _module;

class Module {
  get() {
    return _module;
  }
  set(mod) {
    _module = mod;
    return _module;
  }
}

var singleton = new Module();
export default singleton;


// If there is AMD, then we try to highjack the root module
if (typeof(define) === 'function' && define.amd) {
  define(function (require, exports, module) {
    singleton.set(module);
  });
}
