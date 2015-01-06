# SurveyMe

A survey app built using Node, Express, Backbone, Sequelize, Gulp, and Browserify.

The application consists primarily of a [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) API and a JavaScript [SPA](http://en.wikipedia.org/wiki/Single-page_application) client.

> Note that this app is currently under development and functionally incomplete.

### Prerequisites

* [Node.js](http://nodejs.org/)
* [MySQL](http://www.mysql.com/)

### Installation

Clone the git repo and install dependencies.

```shell
git clone 'https://github.com/brentertz/surveyme.git'
cd surveyme
npm install
```

### Database

Create a new database for each environment that you plan to run the application.

```shell
mysql -u root -e 'create database surveyme_development;'
mysql -u root -e 'create database surveyme_test;'
```

### Configuration

Configuration options are stored in __config/default.js__. To override values, add a gitignored __config/local.js__ file. Note that you can alternatively override values with ENV variables. See [node-config](https://github.com/lorenwest/node-config) for more information.


### Start

##### Build & compile client side code

```shell
gulp build
```

_or for production_

```shell
NODE_ENV=production gulp build
```

##### Start server

```shell
npm start
```

_or for production_

```shell
NODE_ENV=production npm start
```

_or with a debugger_

```shell
npm run start:debug
```

##### Develop - build client side code, watch files, and start server

```shell
gulp develop
```

### Tests

##### Execute test suite

```shell
npm test
```

_or with a debugger_

```shell
npm run test:debug
```
