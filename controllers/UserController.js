/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 */

bcrypt = require('bcrypt');
var before_get = function (object) {
  return {'name': object.name, 'email': object.email};
};

module.exports = {
  find: function (req, res, next) {
    User.findOne({'id': req.session.payload.user_id}, function (err, user) {
      if (user === undefined) return res.send(403, 'Invalid email or password!');
      if (err) return next(err);
      user = before_get(user);
      return res.send(user);
    });
  },

  login: function (req, res, next) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.send(401, 'Please provide email or password!');
    }
    User.findOne({'email': email}, function (err, user) {
      if (user === undefined) return res.send(403, 'Invalid email or password!');
      if (err) return next(err);
      if (bcrypt.compareSync(password, user.password)) {
        var payload = {
          user_id: user.id,
          nonprofit_id: user.nonprofit_id,
          is_superadmin: user.is_superadmin
        };
        res.send({
          token: AuthToken.issueToken(payload)
        });
      } else {
        res.send(403, 'Invalid email or password!');
      }
    });
  },

  update: function (req, res, next) {
    var password = req.param('password');
    var confirm_password = req.param('confirm_password');
    var user_id = req.session.payload && req.session.payload.user_id;
    if (!user_id) {
      return res.send(403, 'invaild token');
    }
    var data = {};
    if (password) {
      if (password == confirm_password) {
        if (password.length < 8) {
          return res.send(400, 'password too short, minimum length is 8 characters');
        }
        data.password = password;
      }
      else {
        return res.send(400, 'passwords don\'t match');
      }
    }
    if (_.isEmpty(data)) {
      res.send(400, "no data");
    }
    User.update({id: user_id}, data).exec(function callback(err) {
      if (err) {
        console.log(err);
        res.send(500, 'internal server error')
      }
      else {
        res.ok();
      }
    });
  }
};
