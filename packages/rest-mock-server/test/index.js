const restMockServer = require('../src');

restMockServer.start(3000, [
  {
    response: {
      body: JSON.stringify({ hello: 'world' })
    }
  }
]);
