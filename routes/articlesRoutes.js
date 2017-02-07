const Router = require('express').Router;
const router = new Router();
const ArticleController = require('../controllers/ArticleController');
const controller = new ArticleController();

router.route('/articles')
      .get(controller.getAll);

router.route('/api/v1/articles')
      .post(controller.create);

router.route('/articles/:id')
      .get(controller.getById);

router.route('/api/v1/articles/:id')
      .delete(controller.delete);

module.exports = router;