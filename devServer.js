var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/styles.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'styles.css'));
});

var bookmarksFile = 'bookmarks-sample.json';

if(process.argv.length > 2) {
  bookmarksFile = process.argv[2];
  console.log('Reading file', bookmarksFile);
}

app.get('/bookmarks.json', function(req, res) {
  // Its an absolute path
  if(path.normalize(bookmarksFile) === path.resolve(bookmarksFile)) {
    res.sendFile(bookmarksFile);
  }
  else {
    res.sendFile(path.join(__dirname, bookmarksFile));
  }
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, '/favicon.ico'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
