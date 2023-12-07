const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Books page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/add-book");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Book</h1>"));
  });

  test('Book HTML form', async function() {
    let res = await fetch("http://localhost:8888/add-book");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let authorFieldFound = body.includes('<input id="author" type="text" name="author"/>');
    assert.ok(authorFieldFound, "Field 'author' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid book', async function() {
    let res = await fetch(
      "http://localhost:8888/add-book",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Zorba the Greek&author=Nikos Kazantzakis"
      }
    );
    let body = await res.text();
    let booksReturned = body.includes(
		"<ul><li>A Song of Ice and Fire (George R. R. Martin)</li><li>Shogun (James Clavell)</li><li>To Kill a Mockingbird (Harper Lee)</li><li>Zorba the Greek (Nikos Kazantzakis)</li></ul>");
    assert.ok(booksReturned, "Add book failed");
  });

  test('Add invalid book', async function() {
     let res = await fetch(
      "http://localhost:8888/add-book",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Zorba the Greek&author="
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add book. Name and author fields are required!");
    assert.ok(errMsg, "Add invalid book should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
	assert.ok(body.includes("Added books: <b>3</b>"), 
		"Add invalid book should not change the books count");
  });
});
