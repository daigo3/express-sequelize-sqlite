
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    tasks = require('./routes/task'),
    http = require('http');
    path = require('path');

var db = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', user.list);
app.post('/users/create', user.create);
app.post('/users/:user_id/tasks/create', task.create);
app.get('/users/:user_id/tasks/:task_id/destroy', task.destroy);

// modelとデーターベースを同期後、サーバーを起動する
db.sequelize
  .sync({ force: true })
  .complete(function(err) { 
    if( err ) {
        throw err;
    } else {
        http.createServer(app).listen(app.get('port'), function(){
          console.log('Express server listening on port ' + app.get('port'));
        });
    }
  });