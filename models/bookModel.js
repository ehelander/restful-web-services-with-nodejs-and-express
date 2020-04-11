const mongoose = require('mongoose');

const { Schema } = mongoose; // Destructure the schema from Mongoose

// Create a new bookModel schema
const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

// Export the bookModel as 'Book'
module.exports = mongoose.model('Book', bookModel);
