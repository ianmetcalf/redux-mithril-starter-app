# Redux Mithril Starter App

[![Travis](https://img.shields.io/travis/ianmetcalf/redux-mithril-starter-app/master.svg)](https://travis-ci.org/ianmetcalf/redux-mithril-starter-app)
[![VersionEye](https://img.shields.io/versioneye/d/user/projects/56d5a3a10a4ec1276e4b06b4.svg)](https://www.versioneye.com/user/projects/56d5a3a10a4ec1276e4b06b4)
[![Gitter](https://img.shields.io/gitter/room/ianmetcalf/redux-mithril-starter-app.svg)](https://gitter.im/ianmetcalf/redux-mithril-starter-app)

## App Architecture

![app-architecture](https://cloud.githubusercontent.com/assets/241551/13621814/555dd718-e568-11e5-880c-f62e62591b0e.png)

### [Action Creators](https://github.com/ianmetcalf/redux-mithril-starter-app/tree/master/app/actions/index.js) - [docs](http://redux.js.org/docs/basics/Actions.html)
* Centralizes logic for creating actions
* Actions are plain javascript objects with a `type` property and optional payload
* Actions conform to the [flux standard action spec](https://github.com/acdlite/flux-standard-action)
* Support [async actions](http://redux.js.org/docs/advanced/AsyncActions.html) using thunk middleware

### [Reducers](https://github.com/ianmetcalf/redux-mithril-starter-app/tree/master/app/reducers/index.js) - [docs](http://redux.js.org/docs/basics/Reducers.html)
* Pure functions that return new state based on current state and dispatched action
* State shape is defined by composing reducers into a hierarchy with a single root

### [Store](https://github.com/ianmetcalf/redux-mithril-starter-app/blob/master/app/store/index.js) - [docs](http://redux.js.org/docs/basics/Store.html)
* Provides API to `dispatch()` actions, `getState()` and `subscribe()` to changes in state
* Allows wrapping dispatch calls with middleware

### [Selectors](https://github.com/ianmetcalf/redux-mithril-starter-app/tree/master/app/selectors/index.js) - [docs](http://redux.js.org/docs/recipes/ComputingDerivedData.html)
* Centralizes logic for accessing and deriving properties from state
* Decouples view from state

### [View](https://github.com/ianmetcalf/redux-mithril-starter-app/blob/master/app/containers/index.js) - [docs](http://mithril.js.org/getting-started.html)
* Composed of [smart components](https://github.com/ianmetcalf/redux-mithril-starter-app/tree/master/app/containers) that know about the store and [dumb components](https://github.com/ianmetcalf/redux-mithril-starter-app/tree/master/app/components) that don't
* Uses middleware to redraw after each dispatch

## Up and Running Locally

* Install nvm

```
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh && source ~/.nvm/nvm.sh
```

* Install node and set default

```
$ nvm install stable && nvm alias default stable
```

* Install local node packages

```
$ npm install
```

* Start the server in development mode...

```
$ npm start
```

* ...and open the [app](http://127.0.0.1:3000)

## Running a Production Build

* Build the assets

```
$ npm run build
```

* Start the server in production mode...

```
$ NODE_ENV=production npm start
```

* ...and open the [app](http://127.0.0.1:3000)

## Contributing

Code should follow the style guide outlined [here](https://github.com/airbnb/javascript)

In order to keep the code clean and free of bugs please run tests before every commit

```
$ npm test
```

You can run live linting and testing using the following command

```
$ npm run test:watch
```
