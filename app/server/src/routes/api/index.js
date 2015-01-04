'use strict';

module.exports = function(app) {
  require('./questions')(app);
  require('./users')(app);
};
