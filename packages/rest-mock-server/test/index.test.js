const fetch = require('isomorphic-fetch');
const { start } = require('../src');

const PORT = 3000;
const getFullUrl = (path = '') => `http://localhost:${PORT}${path}`;
const mocks = [
  {
    request: {
      path: '/a'
    }
  },
  {
    request: {
      path: '/user/1'
    },
    response: {
      status: 201,
      headers: {
        'test-header': 'test-header-value'
      },
      body: JSON.stringify({
        user: {
          name: 'John',
          lastName: 'Doe'
        }
      })
    }
  },
  {
    request: {
      path: '/login'
    },
    response: {
      status: 204,
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
];
let server;

beforeAll(() => {
  return start(PORT, mocks).then(runningServer => {
    server = runningServer;
  });
});

afterAll(() => {
  server.close();
});

describe('start', () => {
  describe('when called', () => {
    describe('when request is sent to server', () => {
      describe('when mock not matched', () => {
        test('responds with 404', () => {
          return fetch(getFullUrl('/unmatched')).then(response => {
            expect(response.status).toEqual(404);
          });
        });
      });

      describe('when mock matched', () => {
        describe('by path', () => {
          test('responds with mocked response', () => {
            return fetch(getFullUrl('/a')).then(response => {
              expect(response.status).toEqual(200);
            });
          });

          test('responds with specified status', () => {
            return fetch(getFullUrl('/user/1')).then(response => {
              expect(response.status).toEqual(201);
            });
          });

          test('responds with specified headers', () => {
            return fetch(getFullUrl('/user/1')).then(response => {
              expect(response.headers.get('test-header')).toEqual(
                'test-header-value'
              );
            });
          });

          test('responds with specified body', () => {
            return fetch(getFullUrl('/user/1')).then(response => {
              return response.json().then(body => {
                expect(body).toEqual({
                  user: {
                    name: 'John',
                    lastName: 'Doe'
                  }
                });
              });
            });
          });
        });
      });
    });
  });
});
