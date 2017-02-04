const express = require('express');
const bodyParser = require('body-parser');
const ArticlesDao = require('./model/ArticlesDao');
const app = express();

// Add support for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
  ArticlesDao.getAll().then(articles => {
    res.send(articles);
  });
});

app.post('/articles', (req, res, next) => {
  const article = {title: req.body.title};
  ArticlesDao.save(article).then(article => {
    console.log(`New article added: ${JSON.stringify(article)}`);
    res.send(article);
  });
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Fetching id: ${id}`);
  ArticlesDao.getById(id).then(article => {
    res.send(article);
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Deleting: ${id}`);
  ArticlesDao.delete(id).then(err => {
    res.send({message: 'Deleted'});
  });
});

app.listen(process.env.PORT || 3000);

module.exports = app;