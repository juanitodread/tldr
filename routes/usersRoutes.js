const Router = require('express').Router;
const router = new Router();
const UserController = require('../controllers/UserController');
const controller = new UserController();

module.exports = router;