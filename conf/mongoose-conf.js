const mongoose = require('mongoose');
const Util = require('../utils/Util');
const Logger = Util.getLogger();

let db = null;
module.exports = {
  connect: () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tldr');

    // Use native promises
    mongoose.Promise = global.Promise;

    db = mongoose.connection;
    db.on('error', Logger.error.bind(Logger, 'connection error:'));
    db.once('open', () => {
      Logger.info(`Connected to mongodb: ${JSON.stringify(db.db.databaseName)}`);
    });
  },

  getDb: () => {
    return db;
  }
};