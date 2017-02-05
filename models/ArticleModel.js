const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Util = require('../utils/Util');

// Logger
const Logger = Util.getLogger();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tldr');

// Use native promises
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', Logger.error.bind(Logger, 'connection error:'));
db.once('open', () => {
  Logger.info(`Connected to mongodb: ${JSON.stringify(db.db.databaseName)}`);
});

const ArticleSchema = new Schema({
  title: String,
  content: String,
  url: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', ArticleSchema);