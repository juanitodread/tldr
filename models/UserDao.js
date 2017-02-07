const UserModel = require('./UserModel');

class UserDao {

  static getAll() {
    return UserModel.find({})
                    .sort({created: -1})
                    .exec();
  }

  static getById(id) {
    return UserModel.findById(id).exec();
  }

  static save(user) {
    return UserModel.create(user);
  }

  static delete(id) {
    return UserModel.remove({_id: id}).exec();
  }

  static getByUsername(username) {
    return UserModel.findOne({username}).exec();
  }

}

module.exports = UserDao;