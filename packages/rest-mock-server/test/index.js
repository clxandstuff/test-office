const restMockServer = require('../src');

restMockServer.start(3000, [
  {
    request: {
      path: '/user/1'
    },
    response: {
      status: 201,
      headers: {
        'test-header': 'test-header value'
      },
      body: JSON.stringify({ message: 'mock for /a' })
    }
  },
  {
    request: {
      path: '/user-exists/1'
    },
    response: {
      status: 204
    }
  }
]);
