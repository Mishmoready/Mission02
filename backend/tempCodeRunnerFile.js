'use strict';
let https = require('https');

let subscriptionKey = '7825de3e46804f8b8ea48ec323aa494a';
let host = 'api.bing.microsoft.com';
let path = '/v7.0/search';

let mkt = 'en-NZ';
let q = 'italian restaurant near me';

let query = '?mkt=' + mkt + '&q=' + encodeURI(q);

let response_handler = function (response) {
  let body = '';
};

response.on('data', function (d) {
  body += d;
});

response.on('end', function () {
  let json = JSON.stringify(JSON.parse(body), null, '  ');
  console.log(json);
});

let Search = function () {
  let request_params = {
    method: 'GET',
    hostname: host,
    path: path + query,
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };

  let req = https.request(request_params, response_handler);
  req.end();
};

Search();
