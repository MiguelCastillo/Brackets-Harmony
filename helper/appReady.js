// highjack the root module so that we can use it for loading
// stylesheets via loadStyleSheet and related methods.
import _module from '_module';

var AppInit  = brackets.getModule("utils/AppInit");
var appReady = new $.Deferred((resolver) => {AppInit.appReady(resolver.resolve);});

export default $.when(_module.ready, appReady).done;
