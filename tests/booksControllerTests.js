// We don't need a reference to mocha, because the test will run inside the mocha framework.
// eslint-disable-next-line no-unused-vars
const should = require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksController');

// Similar to BDD style
describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      // This would be more complicated with a type-safe language.
      // For our purposes, we just need an object with a `save` method.
      const Book = function Book() {
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
