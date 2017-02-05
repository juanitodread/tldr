const express = require('express');
const bodyParser = require('body-parser');
const expressConfig = require('./conf/express-conf');
const indexRoutes = require('./routes/indexRoutes');
const articlesRoutes = require('./routes/articlesRoutes');
const Util = require('./utils/Util');
const Logger = Util.getLogger();
const app = express();

// Set content negotiation
app.use(expressConfig.contentConf);

// Set CORS config
app.all('/*', expressConfig.corsConf);

// Add support for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css'));

// Set routes
app.use('/', indexRoutes);
app.use('/articles', articlesRoutes);

const server = app.listen(process.env.PORT || 3000, () => {
  let {address, port} = server.address();
  Logger.info(`Starting server on http://${address}:${port}`);
});

module.exports = app;