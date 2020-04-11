# [RESTful Web Services with Node.js and Express](https://app.pluralsight.com/library/courses/node-js-express-rest-web-services-update)

Jonathan Mills

## [Course Overview](https://app.pluralsight.com/player?course=node-js-express-rest-web-services-update&author=jonathan-mills&name=0f46065d-05a4-4cc6-80e7-807b90981b21&clip=0&mode=live)

## What is REST

### [Introduction](https://app.pluralsight.com/course-player?clipId=e5aa2f4d-e8c2-4c38-b330-d99dd6ebab4d)

- Note other course: Building Web Applications

### [What is Rest?](https://app.pluralsight.com/course-player?clipId=722a3ab8-3a7a-488c-99f5-6e2b895140a3)

- REST
  - Roy Fielding's dissertation in 2000: Representational State Transfer (ReST)
  - A series of rules (constraints) so that everyone using a service understands how it works.
  - Constraints:
    1. Client Server
       - Client sends a request to the server
       - Server sends a response to the client
    2. Stateless Server
       - When dealing with multiple servers, managing state can be complicated.
       - So we want for the client to be able to send a request to the server and have any server be able to process it: All necessary information should be in the request; we should not be storing any information on the server.
    3. Caching
       - The server sometimes ends up sending information that doesn't change very often.
       - So we want to be specify how long the data is good for so it only makes a request if it's necessary.
    4. Uniform Interface
       - See next

### [Uniform Interface](https://app.pluralsight.com/course-player?clipId=81cbf1e4-d900-4bd5-8891-6ec5bbc749b2)

- 4 pieces to an interface that should always operate consistently
  1. Resources
     - Resources are nouns (things)
     - Verbs are not restful
  2. HTTP verbs dictate the type of activity we're trying to do on the resource
     - GET
       - Request data
     - POST
       - Add data
     - DELETE
       - Remove
     - PUT
       - Replace an object
     - PATCH
       - Only update the parts of the object that are sent back to the service
  3. HATEOAS: Hypermedia as the Engine of Application State
     - With each request, there will be a set of hyperlinks you can use to navigate the API: The API's way of letting you know what other actions you can take.

### [Setting up Your Environment](https://app.pluralsight.com/course-player?clipId=bd268f58-17a1-4dc5-937c-8221c2949ad4)

- Download LTS from NodeJS.org
- Check version
  - Run `node --version`
- Create a new Node project
  - Run `npm init`
    - package name: `api`
    - (defaults)
    - Creates `package.json`
- Install Express
  - Run `npm install express`
    - Note: no `--save`. This has been eliminated in more recent versions of Node.
    - Adds `"express": "^4.17.1"`. `^` &rarr; Will download latest version `4`.
      - To install a specific version: `npm install express@4.16.4`.
- Create `app.js`:

  ```js
  // Import Express.
  var express = require('express');

  // Create an Express instance.
  var app = express();

  // We need a port for Express to listen on. Get the port from an environment variable, or 3000.
  var port = process.env.PORT || 3000;

  // Handle routes: Every time we get a request to `/`, response with a function.
  app.get('/', (request, response) => {
    response.send('Welcome to my API!');
  });

  // Listen on our port.
  app.listen(port, () => {
    console.log('Running on port', port);
  });
  ```

- Fire it up
  - Run `node app.js`
- Open browser to [localhost:3000](localhost:3000)

### [Setting up Some Tooling](https://app.pluralsight.com/course-player?clipId=eb0ad853-4326-47c6-a565-a9642894b8b5)

- Tools

  - eslint
    - Run `npm i eslint -D`
      - `-D` adds it to our `devDependencies`.
      - Rule of thumb: Don't install npm installs globally, as much as possible.
        - Instead, use `scripts` in `package.json` (avoids needing to install eslint globally).
          - This checks `node_modules` first.
        - Add `"lint": "eslint ."` in `package.json` > `scripts`
        - Run `npm run lint -- --init`
          - Everything after `--`: Pass on everything following it to the eslint. So this passes `--init` to `eslint`.
            - Style guide: Airbnb
              - Note: [https://www.npmjs.com/package/eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
                - Run `npx install-peerdeps --dev eslint-config-airbnb-base`
            - React: N
            - JavaScript config file
            - Install everything with npm.
          - Run `npm run lint`
            - Change `var`s to `const`s.
            - Format Document to fix other issues.
  - nodemod

    - Handles restarting application automatically if anything changes, passing in the port, etc.
    - Run `npm install nodemon`
    - Add script: `"start": "nodemon app.js"`
    - Add `package.json` `"nodemonConfig"` section:

      ```json
      {
        "restartable": "rs",
        "ignore": ["node_modules/**/node_modules"],
        "delay": "2500", // delay before restarting app
        "env": {
          "NODE_ENV": "development",
          "PORT": 4000
        }
      }
      ```

    - Run `npm start`
      - And we're now running on port 4000.

### [Summary](https://app.pluralsight.com/course-player?clipId=73b7f212-75b8-420b-928d-5ac6b6bc5991)

## Getting Data

### [Introduction](https://app.pluralsight.com/course-player?clipId=2b8bac75-392a-4102-9a6c-2ec5313ef12a)

- We will implement the HTTP GET verb for getting a list of items or a single item
- Wire up MongoDB with Mongoose
- Search for items

### [Implementing HTTP GET](https://app.pluralsight.com/course-player?clipId=1e22d4d3-60ba-4179-8c85-30ade2964f3c)

- In `app.js`, start building out GET routes.
- Encapsulate routing code in a router
- In `app.js`:

  ```js
  // Create a router
  const bookRouter = express.Router();
  bookRouter
    // Create a `/books` route.
    .route('/books')
    .get((req, res) => {
      // Create a dummy object.
      const response = { hello: 'This is my API' };

      // Send the response back as JSON
      // Other options: `res.send`: send text; `res.render`: render something with a web app
      res.json(response);
    });

  // Serve the route.
  app.use('/api', bookRouter);
  ```

- Navigate to [localhost:4000/api/books](localhost:4000/api/books)

### [Wiring up to MongoDB](https://app.pluralsight.com/course-player?clipId=9714f0a3-495d-4244-902c-5728ed011df1)

- Download & install MongoDB from mongodb.com
  - Run `brew tap mongodb/brew`
  - Run `brew install mongodb-community@4.2`
    - [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  - Run `brew services start mongodb-community@4.2`
  - Run `mongo`
- Goal: Be able to open up a new terminal window, type `mongod`. (actually, `mongo`)
- Download `DataImportInstructions.txt` and `booksJson.js`
- Run `mongo bookAPI < booksJson.js`
- Run `npm install mongoose`
- In `app.js`:

  ```js
  // Import Mongoose.
  const mongoose = require('mongoose');

  // ...

  // Create a database connection
  const db = mongoose.connect('mongodb://localhost/bookAPI');

  // Create a book model, which Mongo uses to drive the verbs.
  const Book = require('./models/bookModel');
  ```

- Create `models/bookModel.js`:

  ```js
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
  ```

- In `app.js`:

  ```js
  bookRouter.route('/books').get((req, res) => {
    // Standard Node convention: Callback is `(error, stuff)`
    Book.find((err, books) => {
      // If we have an error, send that back; otherwise, send the books.
      if (err) {
        // Note that we're `return`ing res.send() so that we break out of the function and don't accidentally send two responses.
        return res.send(error);
      }
      return res.json(books);
    }); // Look in the Book API database in the Book collection
    res.json(response);
  });
  app.use('/api', bookRouter);
  ```

- Open browser to [localhost:4000/api/books](localhost:4000/api/books)
