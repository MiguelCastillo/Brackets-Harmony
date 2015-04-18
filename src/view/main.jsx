import _module from '../_module';
var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

class Main {
  constructor(options = {}) {
    this.$el = options.$el || $("<div>");
    console.log(_module.get().uri);
    ExtensionUtils.loadStyleSheet(_module.get(), 'style/main.css');
  }

  sayHi() {
    console.log("Hello");
  }
}

export default Main;
