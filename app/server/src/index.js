'use strict';

var http = require('http');
var app = require('./lib/app');
var port = app.get('port');
var env = app.get('env');

app.services.database.sequelize.sync({ force: true }).then(function() {
  http.createServer(app).listen(port, function() {
    console.log('Server listening in %s mode on port %d', env, port);
  });
});
