let server;

setup(function() {
  let books = [
    {"name" : "A Song of Ice and Fire", "author" : "George R. R. Martin"},
    {"name" : "Shogun", "author" : "James Clavell"},
    {"name" : "To Kill a Mockingbird", "author" : "Harper Lee"}
  ];
  const express = require('express');
  const app = express();
  server = require('http').createServer(app);
  app.set('view engine', 'pug');
  app.use(require('body-parser')
    .urlencoded({extended:true}));
  const booksController = 
    require("../../controllers/books-controller");
    booksController.setup(app, books);
  server.listen(8888);
});

teardown(function() {
  server.close();
});
