const router = require('express').Router();
const books = require('./books2');
const authors = require('./authors');
const booksByAuthor = require('./books');

let booksDirectory = books;

let authorsDirectory = authors;

let booksByAuthorDirectory = booksByAuthor;

router.get('/books', function (request, response) {
    response.send(booksDirectory)
});

router.get('/books/:bookId', function (request, response) {
    const { bookId } = request.params;

    const book = booksDirectory.find(b => b.isbn === bookId);
    if (!book) return response.status(404).send('Book does not exist');

    response.send(book);
});

router.get('/authors', function (request, response) {
    response.send(authorsDirectory)
});

router.get('/authors/:authorId', function (request, response) {
    const { authorId } = request.params;

    const author = authorsDirectory.find(b => b.authorId === authorId);
    if (!author) return response.status(404).send('Author does not exist');

    response.send(author);
});

router.get('/authors/:authorId/books', function (request, response) {

});

router.post('/books', function (request, response) {
    //after  login.
    const {
        isbn,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website
    } = request.body;

    const bookExists = booksDirectory.find(b => b.isbn === isbn);
    if (bookExists) return response.send('Book already exists');

    const book = {
        isbn,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website
    };
    booksDirectory.push(book);
    response.send(book);
});

router.post('/authors', function (request, response) {
    //after login
    const {
        name,
        rating,
        books,
        authorId
    } = request.body;

    const authorExists = authorsDirectory.find(b => b.name === name);
    if (authorExists) return response.send('Book already exists');

    const author = {
        name,
        rating,
        books,
        authorId
    };
    authorsDirectory.push(author);
    response.send(author);
});

router.post('/admin/login', function (request, response) {

});

router.post('/admin/logout', function (request, response) {

});

router.delete('/books/:bookId', function (request, response) {
    //after login
    const { bookId } = request.params;

    let book = booksDirectory.find(b => b.isbn === bookId);
    if (!book) return response.status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn !== bookId);

    response.send('Book deleted successfully');
});

router.delete('/authors/:authorId', function (request, response) {
    //aftrer login
    const { authorId } = request.params;

    const author = authorsDirectory.find(b => b.authorId === authorId);
    if (!author) return response.status(404).send('Author does not exist');

    authorsDirectory = authorsDirectory.filter(b => b.authorId !== authorId);

    response.send('Author deleted successfully');
});

module.exports = router