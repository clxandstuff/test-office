const { start } = require('../src/index');

describe('start', () => {
  describe('when called', () => {
    describe('when request is sent to server', () => {
      test('responds with 200', () => {
        const stop = start();
        return fetch('http://localhost:3000')
          .then(response => {
            expect(response.status).toEqual(200);
          })
          .then(stop);
      });
    });
  });
});
