const read = require('node-readability');
const ArticlesDao = require('../models/ArticlesDao');
const Util = require('../utils/Util');
const Logger = Util.getLogger();

class ArticleController {

  getAll(req, res, next) {
    ArticlesDao.getAll().then(articles => {
      res.format({
        html: () => {
          res.render('articles.ejs', {articles});
        }, 
        json: () => {
          res.send(articles);
        }
      });
    });
  }

  create(req, res, next) {
    const url = req.body.url;
    Logger.info(`Url: ${url}`);

    read(url, (err, result) => {
      if (err || !result) {
        res.status(500).send('Error downloading article');
      }

      const article = {
        url,
        title: result.title, 
        content: result.content,
      };
      ArticlesDao.save(article).then(article => {
        Logger.info(`New article added: ${JSON.stringify(article)}`);
        res.send(article);
      });
    });
  }

  getById(req, res, next) {
    const id = req.params.id;
    Logger.info(`Fetching id: ${id}`);
    ArticlesDao.getById(id).then(article => {
      res.format({
        html: () => {
          res.render('article.ejs', {article});
        }, 
        json: () => {
          res.send(article);
        }
      });
    });
  }

  delete(req, res, next) {
    const id = req.params.id;
    Logger.info(`Deleting: ${id}`);
    ArticlesDao.delete(id).then(err => {
      res.send({message: 'Deleted'});
    });
  }
}

module.exports = ArticleController;