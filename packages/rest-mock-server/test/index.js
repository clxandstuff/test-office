const restMockServer = require('../src');

restMockServer.start(3000, [
  {
    request: {
      path: '/a'
    },
    response: {
      body: JSON.stringify({ message: 'mock for /a' })
    }
  },
  {
    request: {
      path: '/b'
    },
    response: {
      body: JSON.stringify({ message: 'mock for /b' })
    }
  }
  // {
  //   response: {
  //     body: JSON.stringify({ message: 'mock for all paths' })
  //   }
  // }
]);
