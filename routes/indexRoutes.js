const Router = require('express').Router;
const router = new Router();

const welcome = (req, res) => {
  res.send({
    api: 'Articles API',
    message: 'Welcome to the Articles API'
  });
};

router.route('/').get(welcome);

module.exports = router;