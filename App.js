const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const articles = [{title: 'Example'}];

// Add support for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
  res.send(articles);
});

app.post('/articles', (req, res, next) => {
  const article = {title: req.body.title};
  articles.push(article);
  console.log(`New article added: ${article}`);
  res.send(article);
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Fetching id: ${id}`);
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Deleting: ${id}`);
  delete articles[id];
  res.send({message: 'Deleted'});
});

app.listen(process.env.PORT || 3000);

module.exports = app;