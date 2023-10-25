'use strict'

const Book = require('./BookModel');

function getBooks(req, res, next){
  // could put an if statement here
  Book.find({})
  .then(data => res.status(200).send(data))
  .catch(err => next(err));
}

module.exports = getBooks;