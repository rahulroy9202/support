/*
 * InboundModel
 * @description :: Server-side logic for defining inbound model
 */

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true
    },
    name: 'string',
    password: {
      type: 'STRING',
      minLength: 8
    },
    is_superadmin: {
      type: 'boolean',
      defaultsTo: 'false'
    },
    nonprofit_id: {model: 'nonprofit'}
  },

  beforeCreate: function (values, next) {
    if (typeof values.password !== 'undefined') {
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.password, salt);
      values.password = hash;
    }
    next();
  },

  beforeUpdate: function (values, next) {
    if (typeof values.password !== 'undefined') {
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.password, salt);
      values.password = hash;
    }
    next();
  }

};
