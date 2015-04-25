## Brackets-Harmony
Brackets extension base (boilerplate) project built for ES Harmony.  The idea is that you can have a starting point for your Brackets extension that you are looking to write in ES2015 and later.

Brackets-Harmony has several [gulp](http://gulpjs.com/) tasks that leverage tools such as [babeljs](https://babeljs.io/) and [browserify](http://browserify.org/) to transpile your code written in ES Harmony to good ole ES5, so that your code can happily run in Brackets.


#### React JSX
[babeljs](https://babeljs.io/) natively supports transpiling [react's jsx](https://facebook.github.io/react/docs/jsx-in-depth.html), so you can easily write your components using [react](http://facebook.github.io/react/) using jsx syntax.


#### Gulp tasks

The build system uses [gulp](http://gulpjs.com/), and below are the available tasks.

> Tasks should be tweaked to accommodate your particular needs.


##### package
Compiles all source files, and creates a zip file in the `dist` folder that can be consumed by Brackets.  The generated zip file contains the `package.json` for the project.

```
gulp package
```
##### build
Compiles all source files, and copies them to the `dist` folder.

```
gulp build
```

##### watch
Watches all source files for changes, and recompiles anything that has changed accordingly.

```
gulp watch
```

##### serve
Watches files for changes and spins up a server serving the static content in the `dist` folder.  With small tweaks, you can use this to run your unit tests in the browser with tools like [mocha](http://mochajs.org/)

```
gulp serve
```


#### Getting started
In order to get started, you need install all npm dependencies.

```
npm install
```

Then you normally just run `build`, `package`, or `watch`.

```
gulp build
```

#### Screenshot
<img src="https://raw.githubusercontent.com/MiguelCastillo/Brackets-Harmony/master/img/screenshot.png" width="320px"/>


### Practices - conventions - opinions.

First of all, I strongly encourage folks to write JavaScript using the newer features from ES2015 (formerly named ES6). The new features and syntax makes crafting code in JavaScript a much more joyful experience.  At the very least, you should try it.  Oh, if you want to follow up on a conversation about the ES6 => ES2015 conversion, check [this](https://esdiscuss.org/topic/javascript-2015) out.

Use and abuse [learnharmony](http://learnharmony.org/) and [babeljs](https://babeljs.io/docs/learn-es6/).  They are great resources and they were created to help you.  If you have feedback, please go to their corresponding github repos and submit issues.

**So, ok. You want to try ES2015 in your new Brackets extension...  Where do you go?**

Clone this project, and start writing your Brackets extension code in [`src/main.js`](https://github.com/MiguelCastillo/Brackets-Harmony/blob/master/src/main.js).  That's your main entry point.  All your code goes in the [`src`](https://github.com/MiguelCastillo/Brackets-Harmony/blob/master/src) directory.  The build system in this project can package things up for you so that you can easily load your new extension into Brackets.

1. Run `gulp package`
2. Install the generated zip artifact via Brackets extension manager.
3. Restart Brackets and Ka-Baaam! Your extension is loaded.

Or you can do as I do...  I create a symlink from `dist` into the Brackets' extension's folder.  That way my code changes take effect without needing to reinstall the zip file.

```
ln -sf ~/Projects/Brackets-Harmony/dist ~/Library/Application\ Support/Brackets/extensions/user/harmony
```

> I am on a Linux based OS, so symlinks work great...  I am not sure what the equivalent is on Windows.

There are two helper modules to help you easily integrate with Brackets ecosystem.  `appReady` and `_module`.

- `appReady` is basically a wrapper around `AppInit.appReady` that waits for the module `_module` to be fully loaded.
- `_module` gives you access to the requirejs main module for your plugin so that you can call functions like `ExtensionUtils.loadStyleSheet` that require a requirejs module to find the asset you need to load.


**ReactJS...** I personally have found React to be a really useful tool for writing UI components, so I have included a sample JSX view in this project to help you with your curiosity. But... Feel free to ditch ReactJS and use your favorite stuff.

And finally, this project is created for you!  So *copy it, clone it, use it, abuse it, sell it...*  You cannot really steal it because I have already given it to you.  It's MIT license.  What you don't want to do is just tweak this project and then publish it as your own...  Not because you cannot do it, but because it confuses other developers when deciding what project to use - and that's rude!  Please consider making a PR first - I am very happy to take PRs!
