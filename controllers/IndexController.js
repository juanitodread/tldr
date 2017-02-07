const Auth = require('../utils/security/Auth');
const Util = require('../utils/Util');
const Logger = Util.getLogger();

class IndexController {

  login(req, res, next) {
    const {username, pass} = req.body;
    const user = Auth.validate(username, pass);
    if (!user) {
      Util.invalidCredentials(req, res, next);
      return;
    }
    Logger.debug(`A new token will be generated for user: ${JSON.stringify(user)}`);

    const token = Auth.generateToken(user);
    Logger.debug(`Token: ${JSON.stringify(token)}`);

    res.status(200).send(token);
  }

  welcome(req, res) {
    res.send({
      api: 'Articles API',
      message: 'Welcome to the Articles API'
    });
  }
}

module.exports = IndexController;