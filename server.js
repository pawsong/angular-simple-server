'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    extend = require('extend'),
    prerender = require('prerender-node'),
    angularProxy = require('angular-html5-proxy');

var env = process.env.NODE_ENV;

console.log('Starting angular-simple-server');
console.log('NODE_ENV: %s', env);

// Configurations

var localConfig = {};

if (fs.existsSync(__dirname + '/config.js')) {
  localConfig = require('./config')[env];

  if (!localConfig) {

    console.warn(
      'config.js file exists, but cannot find config for env \'%s\'. ' +
      'Is this what you meant?', env);

    localConfig = {};
  }
}

var config = extend(true, {
  NG_PRERENDER_SERVICE_URL : process.env.NG_PRERENDER_SERVICE_URL || '',
  NG_PROXY_TARGET : process.env.NG_PROXY_TARGET || 'http://0.0.0.0:9000',
  NG_SERVER_PORT : process.env.NG_SERVER_PORT || 8000
}, localConfig);

console.log('Configurations:');
Object.keys(config).forEach(function (key) {
  console.log('  %s: %s', key, config[key] || 'N/A');
});

var app = express();

var extensionFile = 'extension.js',
    extensionPath = path.resolve(__dirname, extensionFile),
    extension;

try {
  extension = require(extensionPath);
}
catch(e) {
  console.error(e.stack);
  console.error('Load extension failed. Cannot require \'%s\'', extensionFile);
  process.exit(1);
}

extension(app, config);

// SEO support
if (config.NG_PRERENDER_SERVICE_URL) {
  prerender.set('prerenderServiceUrl', config.NG_PRERENDER_SERVICE_URL);
  app.use(prerender);
}

// Proxy to origin cdn server
app.use(angularProxy({
  target: config.NG_PROXY_TARGET
}));

app.listen(config.NG_SERVER_PORT, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Server running on %d', config.NG_SERVER_PORT);
});

