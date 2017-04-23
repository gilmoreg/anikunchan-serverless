const https = require('https');

const request = function(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
    request.end();
    });
};

module.exports.youtubeSearch = (event, context, callback) => {
  const { q, pageToken } = event.query;
  let url = 'https://www.googleapis.com/youtube/v3/search/';
  url += `?key=${process.env.YOUTUBE_KEY}`
  url += `&q=${q}`;
  url += '&part=snippet&type=video&maxResults=10&videoEmbeddable=true&safeSearch=moderate';
  if (pageToken) url += `&pageToken=${pageToken}`;
  request(url)
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