const read = require('node-readability');
const UserDao = require('../models/UserDao');
const Util = require('../utils/Util');
const Logger = Util.getLogger();

class UserController {

  getAll(req, res, next) {
    UserDao.getAll().then(users => {
      res.send(users);
    });
  }

  create(req, res, next) {
    const user = req.body;
    Logger.info(`User: ${user}`);
    
    UserDao.save(user).then(user => {
      Logger.info(`New user added: ${JSON.stringify(user)}`);
      res.status(201).send();
    });
  }

  getById(req, res, next) {
    const id = req.params.id;
    Logger.info(`Fetching id: ${id}`);

    UserDao.getById(id).then(user => {
      res.send(user);
    });
  }

  delete(req, res, next) {
    const id = req.params.id;
    Logger.info(`Deleting: ${id}`);

    UserDao.delete(id).then(err => {
      res.send({message: 'Deleted'});
    });
  }
}

module.exports = UserController;