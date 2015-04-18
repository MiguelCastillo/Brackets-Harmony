// highjack the root module so that we can use it for loading
// stylesheets via loadStyleSheet.
import './_module';

// Brackets modules
var AppInit = brackets.getModule("utils/AppInit");
var React   = brackets.getModule("thirdparty/react");

// Application modules
import MainView from './view/main.jsx';

// Your ready callback is when the application is ready
AppInit.appReady(() => {
  //var el = document.getElementById('editor-holder');
  var container = $("<div id='harmony-container'>")
    .appendTo('.main-view > .content')[0];

  React.renderComponent(
    <MainView/>,
    container
  );
});

