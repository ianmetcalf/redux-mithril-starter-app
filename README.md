# Redux Mithril Starter App

[![Travis](https://img.shields.io/travis/ianmetcalf/redux-mithril-starter-app/master.svg)](https://travis-ci.org/ianmetcalf/redux-mithril-starter-app)
[![VersionEye](https://img.shields.io/versioneye/d/user/projects/56d5a3a10a4ec1276e4b06b4.svg)](https://www.versioneye.com/user/projects/56d5a3a10a4ec1276e4b06b4)
[![Gitter](https://img.shields.io/gitter/room/ianmetcalf/redux-mithril-starter-app.svg)](https://gitter.im/ianmetcalf/redux-mithril-starter-app)

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
