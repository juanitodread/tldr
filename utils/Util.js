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

  static notFound(req, res, next) {
    res.status(404).send('Not Found');
  }

  static invalidToken(req, res, next) {
    res.status(401).send('Invalid Token');
  }

  static invalidCredentials(req, res, next) {
    res.status(401).send({'error':'Invalid Credentials'});
  }
  
}

module.exports = Util;