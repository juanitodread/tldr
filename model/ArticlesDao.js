const articles = [];

class ArticleDao {

  static getAll() {
    return articles;
  }

  static getById(id) {
    articles[id];
  }

  static save(article) {
    articles.push(article);
  }

  static delete(id) {
    delete articles[id];
  }

}

module.exports = ArticleDao;