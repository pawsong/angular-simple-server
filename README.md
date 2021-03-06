# angular-simple-server

  Simple server that supports SEO and html5mode rewriting

  [![Build Status][travis-image]][travis-url]

## Prerequisite

  You should have a running static server for AngularJS application codes! (ex. aws s3)

## Features

  * Html5mode rewriting
  * SEO support
    - Using [Prerender](https://prerender.io)
    - Refer to [Google documentation](https://developers.google.com/webmasters/ajax-crawling/docs/specification)
  * Deployment
    - Using [pm2 deployment system](https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#deployment)
    - Automated as a grunt task `grunt deploy`

## Usage

### Minimal Usage

```shell
$ git clone https://github.com/gifff/angular-simple-server
$ cd angular-simple-server
$ npm install
$ PRERENDER_SERVICE_URL=http://localhost:3000 node server
```

### Advanced Usage

#### Show available tasks

```shell
$ grunt
```

#### Run server

```shell
$ node server
$ # OR
$ grunt serve # run by nodemon
```

#### Deploy

```shell
$ cp ecosystem.json.sample ecosystem.json
$ vim ecosystem.json
$ grunt deploy:production
```

#### Extension

  Implement more features in `extension.js` file

## Configurations

Configurations can be set with
  
- Local file `config.js` (NODE_ENV value will be used as env)
- Environment variables.

Local file is used over env variables.

#### NG_PRERENDER_SERVICE_URL

  Default: ''

  - Prerender server URL for SEO support. If omitted, SEO support will be disabled
  - Prerender-hosted service url is `http://service.prerender.io/`

#### NG_PROXY_TARGET

  Default: `http://0.0.0.0:9000`

  - URL of a static server for AngularJS application codes
  - Can use aws s3 bucket when static website hosting feature is enabled

#### NG_SERVER_PORT

  Default: 8000

  - Port of angular-simple-server

## License

  [MIT](LICENSE)

[travis-image]: https://travis-ci.org/gifff/angular-simple-server.svg?branch=master
[travis-url]: https://travis-ci.org/gifff/angular-simple-server
