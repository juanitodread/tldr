const Router = require('express').Router;
const router = new Router();
const ArticleController = require('../controllers/ArticleController');
const controller = new ArticleController();

router.route('/')
      .get(controller.getAll)
      .post(controller.create);

router.route('/:id')
      .get(controller.getById)
      .post(controller.delete);

module.exports = router;