var express       = require('express');
var morgan        = require('morgan');
var cors          = require('cors');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');
var multiparty    = require('connect-multiparty');


function run(api, Auth)
{
  // express application
  var app = express();

  // morgan
  app.use(morgan('combined'));

  // cors
  app.use(cors({
    origin: '*'
  }));

  // body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // cookie-parser & cookie-session
  app.use(cookieParser());
  app.use(cookieSession({
    secret: api.config.cookie.secret,
    cookie: {
      maxAge: api.config.cookie.maxAge
    }
  }));

  // multipart/form-data
  // TODO: this middleware should be used under /api/1/upload api
  app.use(multiparty());

  // static files
  app.use(express.static(api.config.general.paths.public));

  // enable pre-flight CORS request
  app.options('*', cors());

  // setup routes
  for (var name in api.config.route) {
    var controller = api.container.get(name);
    api.config.route[name].forEach(function(v) {
      if (v.auth === false) {
        app[v.method](v.path, controller[v.action]);
      } else {
        app[v.method](v.path, Auth.auth, controller[v.action]);
      }
    });
  }

  // start server
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    api.logger.info('listening at http://%s:%s', host, port);
  });
}

//------------------------------
// bootstrap
//------------------------------
(function() {
  var api = require('../common/bootstrap')({
    appName: 'api',
    configPath: __dirname + '/config'
  });
  api.container.resolve(run);
})();

