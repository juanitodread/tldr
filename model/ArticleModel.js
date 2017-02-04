const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/tldr');

// Enable debug
mongoose.set('debug', true);

// Use native promises
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb');
});

const ArticleSchema = new Schema({
  title: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', ArticleSchema);