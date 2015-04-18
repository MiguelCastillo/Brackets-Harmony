// highjack the root module so that we can use for loading
// stylesheets via loadStyleSheet.
import './_module';

// Brackets modules
var AppInit = brackets.getModule("utils/AppInit");

// Application modules
import Main from './view/main.jsx';

// Your ready callback is when the application is ready
AppInit.appReady(() => {
  var main = new Main($("body"));
  main.sayHi();
});
