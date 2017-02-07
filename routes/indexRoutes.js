const Router = require('express').Router;
const router = new Router();
const IndexController = require('../controllers/IndexController');
const controller = new IndexController();

router.route('/').get(controller.welcome);
router.route('/login').post(controller.login);

module.exports = router;