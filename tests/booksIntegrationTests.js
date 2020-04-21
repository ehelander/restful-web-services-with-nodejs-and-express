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
  it('should allow a book to be posted and return read and _id', (done) => {
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
        // eslint-disable-next-line no-console
        console.log('results');
        results.body.should.have.property('_id');
        done();
      });
  });

  // We're adding data to the database. We want to clean up after ourselves.
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
