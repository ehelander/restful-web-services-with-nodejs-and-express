const express = require('express'); // Import Express.
const mongoose = require('mongoose'); // Import Mongoose.

// Create an Express instance.
const app = express();
// Create a database connection.
const db = mongoose.connect('mongodb://localhost/bookAPI');
// Create a router.
const bookRouter = express.Router();
// We need a port for Express to listen on. Get the port from an environment variable, or 3000.
const port = process.env.PORT || 3000;
// Create a book model, which Mongo uses to drive the verbs.
const Book = require('./models/bookModel');

// Create a route
bookRouter.route('/books').get((req, res) => {
  // Look in the Book API database in the Book collection
  // Standard Node convention: Callback is `(error, stuff)`
  Book.find((err, books) => {
    // If we have an error, send that back; otherwise, send the books.
    if (err) {
      // Note that we're `return`ing res.send() so that we break out of the function
      // and don't accidentally send two responses.
      return res.send(err);
    }
    return res.json(books);
  });
});
// Serve the route
app.use('/api', bookRouter);

// Handle routes: Every time we get a request to `/`, response with a function.
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

// Listen on our port.
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
