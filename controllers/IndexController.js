const Auth = require('../utils/security/Auth');
const Util = require('../utils/Util');
const UserDao = require('../models/UserDao');
const Logger = Util.getLogger();

class IndexController {

  login(req, res, next) {
    const {username, pass} = req.body;

    UserDao.getByUsername(username).then(user => {
      if (user && user.username === username && user.pass === pass) {

        const us = {
          username: user.username,
          name: user.name,
          role: 'admin',
        };

        Logger.debug(`A new token will be generated for user: ${JSON.stringify(us)}`);

        const token = Auth.generateToken(us);
        Logger.debug(`Token: ${JSON.stringify(token)}`);

        res.status(200).send(token);
      } else {
        Util.invalidCredentials(req, res, next);
        return;
      }
    });
  }

  welcome(req, res) {
    res.send({
      api: 'Articles API',
      message: 'Welcome to the Articles API'
    });
  }
}

module.exports = IndexController;