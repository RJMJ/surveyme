'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var hashPasswordHook = function(user, options) {
    var dfd = sequelize.Promise.defer();

    if (!user.changed('password')) {
      dfd.resolve();
    } else {
      bcrypt.hash(user.get('password'), 10, function(err, hash) {
        if (err) {
          dfd.reject(err);
        }

        user.set('password', hash);
        dfd.resolve();
      });
    }

    return dfd.promise;
  };

  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook
    },
    instanceMethods: {
      comparePassword: function(password, callback) {
        bcrypt.compare(password, this.password, callback);
      }
    },
    underscored: true
  });

  return User;
};
