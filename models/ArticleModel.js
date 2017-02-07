const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  content: String,
  url: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', ArticleSchema);