const jwt = require('jsonwebtoken');
const Util = require('../../utils/Util');
const Logger = Util.getLogger();
const UserDao = require('../../models/UserDao');

const SIGNATURE = 'shhhhh';

class Auth {
  static login(username, pass) {
    const user = Auth.validate(username, pass);
    if (!user) {
      return null;
    }
    Logger.debug(`A new token will be generated for user: ${user}`);

    const token = Auth.generateToken(user);
    Logger.debug(`Token: ${token}`);

    return token;
  }

  static validate(username, pass) {
    UserDao.getByUsername(username).then(user => {
      if (user && user.username === username && user.pass === pass) {
        return {
          username: user.username,
          name: user.name,
          role: 'admin',
        };
      } else {
        return null;
      }
    });
  }

  static validateUser() {

  }

  static generateToken(user) {
    const expires = Auth.calcExpiration(1); // 1 days
    const token = jwt.sign({
      expiresIn: expires
    }, SIGNATURE);

    const jwtResponse = {
      token,
      expires,
      user
    };
    Logger.debug(`Generated Token: ${JSON.stringify(jwtResponse)}`);

    return jwtResponse;
  }

  static calcExpiration(days) {
    const now = new Date();
    const expDays = now.getDate() + days;
    Logger.debug(`Expiration days: ${expDays}`);
    now.setDate(expDays);
    Logger.debug(`Expiration date: ${now}`);
    return now;
  }

  static decodeToken(token) {
    const decoded = jwt.verify(token, SIGNATURE);
    return decoded;
  }
}

module.exports = Auth;