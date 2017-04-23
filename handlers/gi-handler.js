const https = require('https');

const request = function(host, path) {
  return new Promise((resolve, reject) => {
    const request = https.get(`https://${host}${path}`, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
    request.end();
    });
};

module.exports.googleImageSearch = (event, context, callback) => {
  const { q, start } = event.query;
  const host = 'www.googleapis.com';
  let path = `/customsearch/v1/?key=${process.env.GOOGLE_CSE_KEY}`
  path += `&cx=${process.env.GOOGLE_CSE_CX}`;
  path += `&q=${q}`;
  path += `&start=${start}&searchType=image&num=10&safe=medium`;
  request(host, path)
    .then((res) => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true,
        },
        body: JSON.parse(res),
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(`${err} for url ${host}${path}`, null);
    });
};