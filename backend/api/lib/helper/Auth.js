var jwt = require('jsonwebtoken');

module.exports = function(api) {

  // express middleware
  function auth(req, res, next)
  {
    var result;

    var token = req.query.token || req.body.token;

    // token doesn't exist
    if (!token) {
      result = {
        success: false
      };
      return res.status(401).send(result);
    }

    // verify token
    jwt.verify(token, api.config.auth.token.secret, function(err, decoded) {

      // check err
      if (err) {
        result = {
          success: false
        };
        return res.status(401).send(result);
      }

      // save user data into request object
      req.user = {
        user_id: decoded.user_id
      };

      return next();
    });
  }

  // interface
  return {
    auth: auth
  };

};

