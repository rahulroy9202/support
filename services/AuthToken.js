var jwt = require('jsonwebtoken');

module.exports = {
  // generate a new token based on payload
  issueToken : function(payload) {
    return jwt.sign(
      payload,
      sails.config.jwt.secret,
      {
        expiresInSeconds : sails.config.jwt.expiryInSeconds
      }
      );
  },

  // Here we verify that the token we received on a request hasn't be tampered with.
  verifyToken : function(token, verified) {
    return jwt.verify(
      token,
      sails.config.jwt.secret,
      {
        expiresInSeconds : sails.config.jwt.expiryInSeconds
      },
      verified
    );
  }

};