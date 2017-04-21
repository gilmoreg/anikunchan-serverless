'use strict';

module.exports.hello = (event, context, callback) => {
  const aniListEndpoint = 'https://anilist.co/api/';
  const anilistAuthTokenPost = anilistEndPoint + 'auth/access_token?grant_type=client_credentials&client_id=solitethos-acaip&client_secret=gBg2dYIxJ3FOVuYPOGgHPGKHZ';
	
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `${process.env.ANILIST_CLIENT_ID}`,
      input: event,
    }),
  };

  callback(null, response);
};
