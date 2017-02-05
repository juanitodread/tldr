const express = require('express');
const bodyParser = require('body-parser');
const read = require('node-readability');
const ArticlesDao = require('./model/ArticlesDao');
const Util = require('./utils/Util');

const app = express();

// Logger
const Logger = Util.getLogger();

// Add support for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css'));

app.get('/articles', (req, res, next) => {
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
});

app.post('/articles', (req, res, next) => {
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
});

app.get('/articles/:id', (req, res, next) => {
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
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Logger.info(`Deleting: ${id}`);
  ArticlesDao.delete(id).then(err => {
    res.send({message: 'Deleted'});
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  let {address, port} = server.address();
  Logger.info(`Starting server on http://${address}:${port}`);
});

module.exports = app;