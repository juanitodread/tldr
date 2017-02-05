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
  
}

module.exports = Util;