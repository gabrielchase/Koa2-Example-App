'use strict';

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require("koa-bodyparser");

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _spdy = require("spdy");

var _spdy2 = _interopRequireDefault(_spdy);

var _routes = require("./middleware/routes");

var _postgres = require("./postgres");

var _todos = require("./models/todos");

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core").transform("code");

var port = process.env.PORT || 3000;

var _setDb = (0, _utils.setDb)(process.env.NODE_ENV);

var dbUri = _setDb.dbUri;


console.log('dbUri: ', dbUri);

var certs = {
    key: _fs2.default.readFileSync('./src/keys/server.key'),
    cert: _fs2.default.readFileSync('./src/keys/server.crt')
};

var app = new _koa2.default();
var router = new _koaRouter2.default();

app.use((0, _koaLogger2.default)());
app.use((0, _koaBodyparser2.default)());
app.use((0, _postgres.postgresMiddleware)(dbUri, _todos.schema));
app.use((0, _routes.routes)());

// http2.createServer(certs, app.callback()).listen(config.server.port, () => 
//     console.log(`Server listening on port: ${config.server.port}`))

app.listen(port, function () {
    return console.log("Server listening on port: " + port);
});