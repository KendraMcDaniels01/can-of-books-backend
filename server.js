require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const BookModel = require('./BookModel.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON data

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/books', async (request, response) => {
  try {
    const { title, description, status } = request.body;

    if (!title || !status) {
      return response.status(400).json({ error: 'Invalid request data' });
    }

    const newBook = new BookModel({
      title,
      description,
      status,
    });

    const savedBook = await newBook.save();

    response.status(201).json(savedBook); // Respond with 201 Created status
  } catch (e) {
    console.error('Error creating a new book', e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/books', async (request, response) => {
  try {
    const documents = await BookModel.find({});
    response.json(documents);
  } catch (e) {
    console.error('Something went wrong when finding all books', e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/books/:id', async (request, response) => {
  try {
    const { title, description, status } = request.body;

    // Validate request data
    if (!title || !status) {
      return response.status(400).json({ error: 'Invalid request data' });
    }

    // Ensure that 'status' is one of the predefined options

    // Find and update the existing book
    const bookId = request.params.id;
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { title, description, status },
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).json({ error: 'Book not found' });
    }

    response.status(200).json(updatedBook);
  } catch (e) {
    console.error('Error updating a book', e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
