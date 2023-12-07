function setup(app, books) {
    app.get('/', function(req, res) {
      let model = {
        title: "My Books Colletion",
        msg: "Books Collection",
        books: books
      };
      res.render('home', model);
    });
    
    app.get('/loaderio-97355a48d08652424ffe033c5cf3d460.txt', function(req, res) {
      res.send('loaderio-97355a48d08652424ffe033c5cf3d460');
    });
  
    app.get('/books', function(req, res) {
      let model = {title: "Books", books};
      res.render('books', model);
    });
  
    app.get('/about', function(req, res) {
      let model = {title: "About"};
      res.render('about', model);
    });
  
    app.get('/add-book', function(req, res) {
      let model = {title: "Add Book"};
      res.render('add-book', model);
    });
  
    function paramEmpty(p) {
      if (typeof(p) != 'string')
        return true;
      if (p.trim().length == 0)
        return true;
      return false;
    }
  
    app.post('/add-book', function(req, res) {
      if (paramEmpty(req.body.name) || paramEmpty(req.body.author) ) {
        let model = {
          title: "Add Book", 
          errMsg: "Cannot add book. Name and author fields are required!"
        };
        res.render('add-book', model);
        return;
      }
      let book = {
        name: req.body.name,
        author: req.body.author
      };
      books.push(book);
      res.redirect('/books');
    });
  }
  
  module.exports = { setup };