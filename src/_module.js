var _module;
var $deferred = $.Deferred();

class Module {
  get() {
    return _module;
  }

  ready(cb) {
    var promise = $deferred.promise;
    return typeof cb === 'function' ? promise.then(cb) : promise;
  }
}

export default new Module();


// If there is AMD, then we highjack the root module
if (typeof(define) === 'function' && define.amd) {
  define(function (require, exports, module) {
    _module = module;
    $deferred.resolve(_module);
  });
}
