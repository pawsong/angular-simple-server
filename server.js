'use strict';

var path = require('path'),
    express = require('express'),
    prerender = require('prerender-node'),
    angularProxy = require('angular-html5-proxy');

// Configurations
var config = {
  NG_PRERENDER_SERVICE_URL : process.env.NG_PRERENDER_SERVICE_URL,
  NG_PROXY_TARGET : process.env.NG_PROXY_TARGET || 'http://0.0.0.0:9000',
  NG_SERVER_PORT : process.env.NG_SERVER_PORT || 8000
};

console.log('Starting angular-simple-server');

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

extension(app);

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

