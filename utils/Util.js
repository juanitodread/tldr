const Winston = require('winston');
const tsFormat = () => (new Date());

class Util {

  static getLogger() {
    const logger = new (Winston.Logger)({
      level: 'debug',
      transports: [
        new (Winston.transports.Console)({
          timestamp: tsFormat,
          colorize: true
        })
      ]
    });
    return logger;
  }

  static getCorsConfing() {
    return (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      if (req.method == 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    };
  }

}

module.exports = Util;