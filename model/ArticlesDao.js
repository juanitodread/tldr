const ArticleModel = require('./ArticleModel');

class ArticleDao {

  static getAll() {
    return ArticleModel.find({}).exec();
  }

  static getById(id) {
    return ArticleModel.findById(id).exec();
  }

  static save(article) {
    return ArticleModel.create(article);
  }

  static delete(id) {
    return ArticleModel.remove({_id: id}).exec();
  }

}

module.exports = ArticleDao;