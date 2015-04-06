'use strict';

var express = require('express'),
    prerender = require('prerender-node'),
    angularProxy = require('angular-html5-proxy');

// Configurations
var config = {
  prerenderServiceUrl : process.env.PRERENDER_SERVICE_URL,
  proxyTarget : process.env.PROXY_TARGET || 'http://0.0.0.0:9000',
  port : process.env.PORT || 8000
};

console.log('starting angular-server');

console.log('configurations:');
Object.keys(config).forEach(function (key) {
  console.log('  %s: %s', key, config[key] || 'N/A');  
});

var app = express();

// SEO support
if (config.prerenderServiceUrl) {
  prerender.set('prerenderServiceUrl', config.prerenderServiceUrl); 
  app.use(prerender);
}

// Proxy to origin cdn server
app.use(angularProxy({
  target: config.proxyTarget
}));

app.listen(config.port, function (err) {
  if (err) {
    console.error(err);
    return; 
  }
  
  console.log('server running on %d', config.port); 
});

