const https = require('https');

const request = function(host, path) {
  return new Promise((resolve, reject) => {
    const request = https.request({ 
      host,
      path,
      method: 'post',
    }, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
    request.end();
    });
};

module.exports.getToken = (event, context, callback) => {
  const host = 'anilist.co';
  const path = `/api/auth/access_token?grant_type=client_credentials&client_id=${process.env.ANILIST_CLIENT_ID}&client_secret=${process.env.ANILIST_CLIENT_SECRET}`;
  request(host, path)
    .then((res) => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true,
        },
        body: JSON.stringify(res),
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(err, null);
    });
};
