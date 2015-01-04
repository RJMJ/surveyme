'use strict';

module.exports = function() {
  var SiteController = {
    index: function(req, res) {
      res.render('index', { title: 'SurveyMe' });
    }
  };

  return SiteController;
};
