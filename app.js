// Import Express.
var express = require('express');

var app = express();

// We need a port for Express to listen on. Get the port from an environment variable, or 3000.
// var port = process.env.PORT || 3000;
var port = 3000;

// Handle routes: Every time we get a request to `/`, response with a function.
app.get('/', (request, response) => {
  response.send('Welcome to my API!');
});

// Listen on our port.
app.listen(port, () => {
  console.log('Running on port', port);
})
