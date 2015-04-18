## Brackets-Harmony
Brackets extension base project with ES Harmony.  The idea is that you can have a starting point for your Brackets extension that you are looking to write in ES Harmony.


Brackets-Harmony has serveral [gulp](http://gulpjs.com/) tasks that leverage tools such as [babeljs](https://babeljs.io/) and [browserify](http://browserify.org/) to transpile your code written in ES Harmony to good ole ES5, so that your code can happily run in Brackets.


#### React JSX
[bablejs](https://babeljs.io/) natively supports tranpiling [react's jsx](https://facebook.github.io/react/docs/jsx-in-depth.html), so you can easily write your components using [react](http://facebook.github.io/react/) using jsx syntax.

#### Gulp tasks

The build system uses [gulp](http://gulpjs.com/), and below are the available tasks.

> Tasks should be tweaked to accommodate your particular needs.


##### package
Compiles all source files, and creates a zip file in the `dist` folder that can be consumed by Brackets.  The generated zip file contains the `pacjage.json` for the project.

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
