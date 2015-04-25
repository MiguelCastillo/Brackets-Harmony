// Brackets modules
var React = brackets.getModule("thirdparty/react");

import appReady from './appReady';
import MainView from './view/main.jsx';


appReady(() => {
  // Your ready callback is when the application is ready
  var container = $("<div id='harmony-container'>").appendTo('.main-view > .content')[0];

  React.renderComponent(
    <MainView/>,
    container
  );
});
