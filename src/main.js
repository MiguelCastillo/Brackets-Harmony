// Brackets modules
var React = brackets.getModule('thirdparty/react');

// App ready helper
import appReady from 'appReady';

// Views... Views... Views...
import MainView from './view/main.jsx';


// Load things up when the app is ready
appReady(() => {
  // Your ready callback is when the application is ready
  var container = $('<div id="harmony-container">').appendTo('.main-view > .content')[0];

  React.render(
    <MainView />,
    container
  );
});
