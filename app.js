// Import Express.
const express = require('express');

const app = express();

// We need a port for Express to listen on. Get the port from an environment variable, or 3000.
const port = process.env.PORT || 3000;

// Handle routes: Every time we get a request to `/`, response with a function.
app.get('/', (request, response) => {
  response.send('Welcome to my Nodemon API!');
});

// Listen on our port.
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
