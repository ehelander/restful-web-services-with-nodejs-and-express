# RESTful Web Services with Node.js and Express]

Jonathan Mills

## [Course Overview](https://app.pluralsight.com/player?course=node-js-express-rest-web-services-update&author=jonathan-mills&name=0f46065d-05a4-4cc6-80e7-807b90981b21&clip=0&mode=live)

## What is REST?

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
- Create `app.js`

```js
// Import Express.
var express = require('express');

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
})
```

- Fire it up
  - Run `node app.js`
- Open browser for port (localhost:3000)

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
              - Note: https://www.npmjs.com/package/eslint-config-airbnb-base
                - Run `npx install-peerdeps --dev eslint-config-airbnb-base`
            - React: N
            - JavaScript config file
            - Install everything with npm.
          - Run `npm run lint`
            - Change `var`s to `const`s.
            - Format Document to fix other issues.
        - 
  - nodemod
    - Handles restarting application, passing in the port, etc.

### [Summary]()