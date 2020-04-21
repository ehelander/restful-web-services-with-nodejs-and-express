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

### [Filtering with a Query String](https://app.pluralsight.com/course-player?clipId=30f00928-05f6-4f89-8f8d-eb1b97ae9ffe)

- We want to add a query string parameter via Mongoose `find`.
- In `app.js`:

  ```js
  bookRouter.route('/books').get(req, res) => {
    // Takes the query string and creates an object out of it.
    const { query } = req;
    // Pass the query to Mongo
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
  ```

- But passing a bad query parameter breaks the query, since it gets passed along to Mongo.
- In `app.js`:

  ```js
  bookRouter.route('/books').get((req, res) => {
    const { query } = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
  ```

### [Getting a Single Item](https://app.pluralsight.com/course-player?clipId=386c084b-8589-4288-9d28-7140954bd401)

- Find a single item: We want to get a book by its ID.
- Add a second route in `app.js`):

  ```js
  bookRouter.route('/books').get((req, res) => {
    const { query } = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
  // The `/:bookId` gives us a `bookId` variable we can reference.
  bookRouter.route('/books/:bookId').get((req, res) => {
    const { query } = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    // Use `findById` instead; use the `bookId` param.
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });
  ```

- Open browser: [http://localhost:4000/api/books/5e92303babc885b4634c9436](http://localhost:4000/api/books/5e92303babc885b4634c9436)

### [Summary](https://app.pluralsight.com/course-player?clipId=4cb80ef9-0957-4afb-896e-d831ab944d0d)

## Posting Data

### [Introduction](https://app.pluralsight.com/course-player?clipId=ac8ab997-a18a-40e3-9758-c194d8d8b1bc)

### [Parsing POST data with Body Parser](https://app.pluralsight.com/course-player?clipId=34d8e6ae-1048-4959-adc6-83a818655951)

- Run `npm install body-parser`
- In `app.js`: Add a new `post` verb to the `/books` route:

  ```js
  const bodyParser = require('body-parser');

  // ...

  app.use(bodyParser.urlencoded({ extended: true }));
  // Pull JSON out of the body.
  app.use(bodyParser.json());

  // ...

  bookRouter
    .route('/books')
    .post((req, res) => {
      // Create a new Mongoose Book object.
      const book = new Book(req.body);
      console.log(book);
      return res.json(book);
    })
    .get((req, res) => {
      const { query } = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });
  ```

### [Testing with Postman](https://app.pluralsight.com/course-player?clipId=4254b0a6-a06f-4344-aed1-caa8ba03b16f)

- We'll use Postman to handle our API calls.
- Download [Postman](https://www.postman.com/).
- Send a request to get the list of books:
  - GET `localhost:4000/api/books`
- Send a request to get a specific book:
  - GET `localhost:4000/api/books/5e92303babc885b4634c9436`
- Send a request to create a book:

  - POST `localhost:4000/api/books`
  - Body > raw

    ```json
    {
      "title": "Jon's Book",
      "genre": "Fiction",
      "author": "Jon Mills"
    }
    ```

  - Change `Text` to `JSON` (which automatically sets the `Content-Type` header to `application/json`)
  - The call succeeds; but we're not persisting it yet.

### [Saving Data](https://app.pluralsight.com/course-player?clipId=40af93e6-3ceb-41e4-825b-57e8ebd707b2)

- Back in app.js:

  ```js
    .post((req, res) => {
      const book = new Book(req.body);
      // Save the book.
      book.save();
      // Return a 201 status in addition to the book.
      return res.status(201).json(book);
    })
  ```

- Send the same POST request from earlier:

  - POST `localhost:4000/api/books`

    ```json
    {
      "title": "Jon's Book",
      "genre": "Fiction",
      "author": "Jon Mills"
    }
    ```

- Verify the new book is returned in the book list (GET `localhost:4000/api/books`)

### [Code Cleanup](https://app.pluralsight.com/course-player?clipId=e37bce3e-514a-4299-8137-4d4e278d9e43) & [Injecting the Book Model](https://app.pluralsight.com/course-player?clipId=4f37014b-4976-4115-b06f-e8e4cf83509d)

- In `app.js`, import bookRouter.

  ```js
  // const bookRouter = express.Router();
  // Note that we need to pass in the Book model.
  const bookRouter = require('./routes/bookRouter')(Book);
  ```

- Create `routes/bookRouter.js`:

  ```js
  const express = require('express');

  // Paste in all the router code from app.js.
  // Pass in the Book model.
  function routes(Book) {
    // We need to create a bookRouter.
    const bookRouter = express.Router();
    bookRouter
      .route('/books')
      .post((req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
      })
      .get((req, res) => {
        const { query } = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
          if (err) {
            return res.send(err);
          }
          return res.json(books);
        });
      });
    bookRouter.route('/books/:bookId').get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });
    // And we need to return the bookRouter now.
    return bookRouter;
  }

  // Export the function.
  module.exports = routes;
  ```

- Send a new request:

  - POST `localhost:4000/api/books`:

    ```json
    {
      "title": "Jon's Book Sequel",
      "genre": "Fiction",
      "author": "Jon Mills"
    }
    ```

- Get the list of books and the newly-created book to verify it succeeded.

### [Summary](https://app.pluralsight.com/course-player?clipId=d4925d66-8b68-426c-8a91-fb0fc08e0222)

## Updating Data

### [Introduction](https://app.pluralsight.com/course-player?clipId=7ef727f9-e7de-4a43-a8a8-87902cff35c5)

- PUT: Replace an item
- PATCH: Only update the specific parts of the resource that are sent to the API.
- DELETE: Delete

### [Implementing PUT](https://app.pluralsight.com/course-player?clipId=87d835b9-44d2-4f4c-9c27-913fa09b5fcc)

- In `bookRouter.js`:

  ```js
  bookRouter
    .route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .put((req, res) => {
      // Find the book.
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        // Note that these violate eslint-disable no-param-reassign.
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        // Save our changes.
        book.save();
        return res.json(book);
      });
    });
  ```

### [Testing PUT](https://app.pluralsight.com/course-player?clipId=c3d6c87c-40d6-4d3d-98c1-495032464b8f)

- PUT: `localhost:4000/api/books/{id}`
- Change title to `John's New Book Sequel`
- Note that `_id` is a Mongo-inserted value.

### [Middleware](https://app.pluralsight.com/course-player?clipId=ef973e46-50ac-4339-97b3-d9ee872f7cde)

- We've been repeating `Book.findById()` in `bookRouter.js`.
- Middleware injects itself between the client sending a request and the route receiving the request.
- Above `bookRouter.route('/books/:bookId')`:

  ```js
  // Use middleware only for this route.
  // The middleware uses the 'next' function to signal it has completed processing and should move on to the next thing.
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      // If the book exists, pass it downstream by adding it to the request.
      if (book) {
        req.book = book;
        // Call `next()` to signal we're done. Return it so we exit.
        return next();
      }
      // If we don't find the book, return a 404.
      return res.sendStatus(404);
    });
      });
  bookRouter
    .route('/books/:bookId')
      // For our GET, we know errors have already been handled and the book is on the request.
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save();
        return res.json(book);
    });
  });
  ```

### [Implementing PATCH](https://app.pluralsight.com/course-player?clipId=16dc664a-0cb6-407a-b444-48ecb9244ef8)

- In `bookRouter.js`:

  ```js
  bookRouter
    .route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });
    .patch((req, res) => {
      const { book } = req;
      // If the `_id` was included in the request, remove it.
      // Note that this violates eslint no-underscore-dangle
      if (req.body._id) {
        delete req.body._id;
      }
      // Loop through the entries in the response. Add them to the book.
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      // Save the book.
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });
  ```

### [Testing PATCH](https://app.pluralsight.com/course-player?clipId=405d27b8-5595-4c48-b9c0-3d6f159264ac)

- PATCH `localhost:4000/api/books/5e9e2c82f3938a1e3c0fb677`

  ```json
  {
    "read": true
  }
  ```

### [Implementing DELETE](https://app.pluralsight.com/course-player?clipId=1f037a56-0ab8-448f-94d9-c7c31a10d52c)

- In `bookRouter.js`:

  ```js
  function routes(Book) {
    const bookRouter = express.Router();
    // ...
    bookRouter
      .route('/books/:bookId')
      // ...
      .delete((req, res) => {
        req.book.remove((err) => {
          if (err) {
            return res.send(err);
          }
          // Since there is no book to return, send a 204 indicating it was removed successfully.
          return res.sendStatus(204);
        });
      });
    return bookRouter;
  }
  ```

- DELETE `localhost:4000/api/books/5e9e2c82f3938a1e3c0fb677`

### Summary

## Testing

### [Introduction](https://app.pluralsight.com/course-player?clipId=50f070df-d4a9-4a06-bd28-a708c3c5f8d6)

- We've implemented the HTTP verbs, but we're not _truly_ restful yet because we haven't implemented hypermedia.
- We'll separate our code into controllers to make testing our routes easier.

### [Controllers](https://app.pluralsight.com/course-player?clipId=0cb5574d-8876-4e6b-a115-87f206f8b4a5)

- We want to move the route anonymous functions into a controller.
- In `bookRouter.js`:

  ```js
  const express = require('express');
  // Pull in booksController (not created yet).
  const booksController = require('../controllers/booksController');

  function routes(Book) {
    const bookRouter = express.Router();
    bookRouter
      .route('/books')
      // .post((req, res) => {
      //   const book = new Book(req.body);
      //   book.save();
      //   return res.status(201).json(book);
      // })
      // Replace the anonymous function for `.post` with `controller.post`
      .post(controller.post)
      .get((req, res) => {
        const { query } = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
          if (err) {
            return res.send(err);
          }
          return res.json(books);
        });
      });
  ```

- Create `controllers/booksController.js`:

  ```js
  // Pass in the book when it's first created.
  function booksController(Book) {
    function post(req, res) {
      // Paste the anonymous function we removed from bookRouter.
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    }
  }

  module.exports = booksController;
  ```

- In `bookRouter.js`:

  ```js
  const express = require('express');
  const booksController = require('../controllers/booksController');

  function routes(Book) {
    const bookRouter = express.Router();
    // Pass Book into our controller.
    const controller = booksController(Book);
    bookRouter
      .route('/books')
      .post(controller.post)
      // Move .get over to our controller.
      .get(controller.get);
  }
  ```

- In `booksController`:

  ```js
  function booksController(Book) {
    function post(req, res) {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    }
    function get(req, res) {
      const { query } = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    }
    // The revealing module pattern: The controller returns the list of exposed functions.
    return { post, get };
  }

  module.exports = booksController;
  ```

### [Postman and Bugs](https://app.pluralsight.com/course-player?clipId=4ec4d609-88ff-4e20-bcdd-df7d778281e5)

- Right now, we can POST a new book without a title.

### [Testing with Mocha](https://app.pluralsight.com/course-player?clipId=1fb64b4f-9bf6-4727-9dc4-2d55a5aaba1e)

- Create a new `tests` directory.
- Create `tests/booksControllerTests.js`;
- Run `npm install -D mocha should sinon`
  - `mocha`: testing framework
  - `should`: assertion framework
  - `sinon`: for mocking
- In `booksControllerTests.js`:

  ```js
  // We don't need a reference to mocha, because the test will run inside the mocha framework.
  const should = require('should');
  const sinon = require('sinon');
  const bookController = require('../controllers/booksController');

  // Similar to BDD style
  describe('Book Controller Tests:', () => {
    describe('Post', () => {
      it('should not allow an empty title on post', () => {
        // This would be more complicated with a type-safe language.
        // For our purposes, we just need an object with a `save` method.
        const Book = function (book) {
          this.save = () => {};
        };

        const req = {
          body: {
            author: 'Jon',
          },
        };

        const res = {
          status: sinon.spy(),
          send: sinon.spy(),
          json: sinon.spy(),
        };

        const controller = booksController(Book);
        controller.post(req, res);

        res.status
          .calledWith(400)
          .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Title is required').should.equal(true);
      });
    });
  });
  ```

- In `.eslintrc.js`, we may need to add the following to resolve eslint errors.

  ```js
  module.exports = {
    // ...
    env: {
      node: true,
      mocha: true,
    },
    // ...
  };
  ```

### [Running Tests](https://app.pluralsight.com/course-player?clipId=c4e5268f-d2c8-47d1-b9b6-26b9193bd637)

- In `package.json`:

  ```json
  {
    // ...
    "scripts": {
      // ...
      "test": "mocha tests/**/*Tests.js"
    }
    // ...
  }
  ```

- In `booksController`:

  ```js
  function booksController(Book) {
    function post(req, res) {
      const book = new Book(req.body);
      // Return a 400 if no title is included.
      if (!req.body.title) {
        res.status(400);
        return res.send('Title is required');
      }
      book.save();
      // Separate these two calls so testing them is more straightforward.
      // return res.status(201).json(book);
      res.status(201);
      return res.json(book);
    }
    // ...
  }
  ```

- Run `npm test`

### [Integration Tests](https://app.pluralsight.com/course-player?clipId=ec983707-bf5b-4a27-8c00-87a51c2ea8ee)

- Run `npm install supertest -D`
- In `app.js`:

  ```js
  // So that we can access app in our integration tests.
  module.exports = app;
  ```

- Create `tests/booksIntegrationTests.js`:

  ```js
  require('should');

  const request = require('supertest');
  const mongoose = require('mongoose');

  process.env.ENV = 'Test';

  const app = require('../app.js');

  const Book = mongoose.model('Book');

  // We need our supertest agent to run the app.
  const agent = request.agent(app);

  describe('Book Crud Test', () => {
    // We'll call the `done` callback when we're done so supertest knows the test is complete.
    it('should allow a book to be posted and return red and _id', (done) => {
      const bookPost = {
        title: 'My Book',
        author: 'Jon',
        genre: 'Fiction',
      };

      agent
        .post('/api/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
          console.log('results');
          results.body.read.should.not.equal(false);
          results.body.should.have.property('_id');
          done();
        });
    });

    // We're adding data to the database. We want to clean up after ourselves.
    afterEach((done) => {
      Book.deleteMany({}).exec();
      done();
    });
  });
  ```

- In `app.js`:

  ```js
  if (process.env.ENV === 'Test') {
    console.log('This is a test');
    const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
  } else {
    console.log('This is for real');
    const db = mongoose.connect('mongodb://localhost/bookAPI-prod');
  }
  ```

- Run `npm t`. It passes, when we expected it to fail.
- Note that our Mongoose connection is still open and our app is still listening on its port. We want these to close at the end of our test (so the test stops).
- In `app.js`:

```js
// Add app.server so that we can access it (to close it) from our tests.
app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
```

- In `booksIntegrationTests.js`:

  ```js
  // ...
  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  }
  // ...
  ```

### [Summary](https://app.pluralsight.com/course-player?clipId=691b4dad-de3e-4acf-bdcd-24eb5896f0c1)

## HATEOAS

### [Introduction](https://app.pluralsight.com/course-player?clipId=249950fa-5201-492e-a8f3-8aefba2f00aa)

- **H**ypermedia **a**s **t**he **e**ngine **o**f **a**pplication **s**tate
- Using hypermedia can help us build a self-documenting API.

### [Navigating Your API](https://app.pluralsight.com/course-player?clipId=e154d06f-5b5b-4a9b-aa13-948fabcc14ce)

- `http://localhost:4000/api/books` returns a list of books.
- `http://localhost:4000/api/books/{bookId}` returns an individual book. But how are users supposed to know this?

### [Adding Hyperlinks](https://app.pluralsight.com/course-player?clipId=3694a6eb-1d55-489c-97a8-e4f846487080)

- In `booksController.js`:

  ```js
  function booksController(Book) {
    // ...
    function get(req, res) {
      const { query } = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        const returnBooks = books.map((book) => {
          // Strip out mongoose-specific things.
          const newBook = book.toJSON();
          // Add a `links` section.
          newBook.links = {};
          newBook.links.self = `http://${req.headers.host}/api/books/${books._id}`;
          return newBook;
        });
        return res.json(returnBooks);
      });
    }
    return { post, get };
  }

  module.exports = booksController;
  ```

- `http://localhost:4000/api/books` returns a list of books with links to the individual books.

- In `bookRouter.js`:

  ```js
  function routes(Book) {
    const bookRouter = express.Router();
    const controller = booksController(Book);
    // ...
    bookRouter.route('/books/:bookId').get((req, res) => {
      const returnBook = req.book.toJSON();
      returnBook.links = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBooks.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      return res.json(returnBook);
    });
    // ...
    return bookRouter;
  }

  module.exports = routes;
  ```

### [Summary](https://app.pluralsight.com/course-player?clipId=77393f2f-06e3-4ddb-ba92-dd1e5bc7438d)
