'use strict';

module.exports = function(factory, database) {
  var User = database.User;
  var emailSequence = 1;

  factory.define('user', User, {
    email: function() {
      return 'user' + emailSequence++ + '@demo.com';
    },
    password: 'password',
    admin: true
  });
};
