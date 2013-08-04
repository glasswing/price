
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , stores = require('./routes/stores')
  , http = require('http')
  , path = require('path')
  , cons = require("consolidate")
  , swig = require("swig");

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine(".html", cons.swig)
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

swig.init({
	root: __dirname + "/views",
	allowErrors: true
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/stores', stores.list);
app.post('/json/stores/add', stores.add_json);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
