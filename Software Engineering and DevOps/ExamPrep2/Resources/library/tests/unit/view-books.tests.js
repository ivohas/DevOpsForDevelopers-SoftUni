const assert = require('assert');
const fetch = require('node-fetch');

suite('View Books page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/books");
    let body = await res.text();
    assert.ok(body.includes("<h1>Added Books</h1>"));
  });
  
  test('Books list', async function() {
    let res = await fetch("http://localhost:8888/books");
    let body = await res.text();
    assert.ok(body.includes("<ul><li>A Song of Ice and Fire (George R. R. Martin)</li><li>Shogun (James Clavell)</li><li>To Kill a Mockingbird (Harper Lee)</li></ul>"));
  });
});
