'use strict';

module.exports = function(app) {
  var QuestionsController = require('../../controllers/api/questions-controller')(app);

  app.get('/api/questions', QuestionsController.index);
  app.get('/api/questions/:id', QuestionsController.show);
  app.post('/api/questions', QuestionsController.create);
  app.put('/api/questions/:id', QuestionsController.update);
  app.delete('/api/questions/:id', QuestionsController.destroy);
};
