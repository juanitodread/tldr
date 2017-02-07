const Auth = require('../utils/security/Auth');
const Util = require('../utils/Util');
const Logger = Util.getLogger();

class AuthFilter {

  static doValidate(req, res, next) {
    Logger.debug('doValidate');

    const token = req.headers['authorization'];

    Logger.debug(`Token: ${token}`);
    if(!token) {
      Util.invalidToken(req, res, next);
      return;
    }

    const decoded = Auth.decodeToken(token);
    Logger.debug(`Decoded token: ${JSON.stringify(decoded)}`);

    // Verify token expiration
    if (decoded.exp <= Date.now()) {
      res.status(400).send("Token expired");
    }

    // Add logic to verify user access to the resource

    next();
  }

}

module.exports = AuthFilter;