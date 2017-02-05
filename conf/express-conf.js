const Util = require('../utils/Util');
const Logger = Util.getLogger();

module.exports = {

  contentConf: (req, res, next) => {
    Logger.debug('Configuring express framework');
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  },

  corsConf: (req, res, next) => {
    Logger.debug('Configuring CORS');
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }

};