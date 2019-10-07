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
  },
  {
    request: {
      path: '/login'
    },
    response: {
      cookies: [
        {
          name: 'cookie-1',
          value: 'just a cookie'
        },
        {
          name: 'cookie-2',
          value: 'only http cookie',
          options: {
            httpOnly: true
          }
        }
      ]
    }
  }
]);
