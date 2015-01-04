'use strict';

module.exports = function(app) {
  var UsersController = require('../../controllers/api/users-controller')(app);

  app.get('/api/users', UsersController.index);
  app.get('/api/users/:id', UsersController.show);
  app.post('/api/users', UsersController.create);
  app.put('/api/users/:id', UsersController.update);
  app.delete('/api/users/:id', UsersController.destroy);
};
