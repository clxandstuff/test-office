const fetch = require('isomorphic-fetch');
const { start } = require('../src');

const PORT = 3000;
const getFullUrl = (path = '') => `http://localhost:${PORT}${path}`;
const defaultMocks = [
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

function setup(mocks, config) {
  return start(PORT, mocks, config);
}

function tearDown(server) {
  return new Promise(resolve => {
    server.close(resolve);
  });
}

describe('start', () => {
  describe('when called', () => {
    describe('when request is sent to server', () => {
      describe('when log is true', () => {
        test('logs request to console', async () => {
          const logSpy = jest.spyOn(console, 'log');
          const server = await setup(defaultMocks, { log: true });
          logSpy.mockReset();

          await fetch(getFullUrl('/a'));

          expect(logSpy).toHaveBeenCalled();
          return tearDown(server);
        });
      });

      describe('when log is function', () => {
        test('calls log function with req', async () => {
          const logMock = jest.fn();
          const server = await setup(defaultMocks, { log: logMock });

          await fetch(getFullUrl('/a'));

          expect(logMock).toHaveBeenCalled();
          return tearDown(server);
        });
      });

      describe('when mock not matched', () => {
        test('responds with 404', async () => {
          const server = await setup(defaultMocks);

          await fetch(getFullUrl('/unmatched')).then(response => {
            expect(response.status).toEqual(404);
          });

          return tearDown(server);
        });
      });

      describe('when mock matched', () => {
        test('responds with specified status', async () => {
          const server = await setup(defaultMocks);

          await fetch(getFullUrl('/user/1')).then(response => {
            expect(response.status).toEqual(201);
          });

          return tearDown(server);
        });

        test('responds with specified headers', async () => {
          const server = await setup(defaultMocks);

          await fetch(getFullUrl('/user/1')).then(response => {
            expect(response.headers.get('test-header')).toEqual(
              'test-header-value'
            );
          });

          return tearDown(server);
        });

        test('responds with specified body', async () => {
          const server = await setup(defaultMocks);

          await fetch(getFullUrl('/user/1')).then(response => {
            return response.json().then(body => {
              expect(body).toEqual({
                user: {
                  name: 'John',
                  lastName: 'Doe'
                }
              });
            });
          });

          return tearDown(server);
        });

        describe('by path', () => {
          test('responds with mock', async () => {
            const server = await setup([
              {
                request: {
                  path: '/a'
                }
              }
            ]);

            await fetch(getFullUrl('/a')).then(response => {
              expect(response.status).toEqual(200);
            });

            await fetch(getFullUrl('/b')).then(response => {
              expect(response.status).toEqual(404);
            });

            return tearDown(server);
          });
        });

        describe('by method', () => {
          test('responds with mock', async () => {
            const server = await setup([
              {
                request: {
                  method: 'POST'
                }
              }
            ]);

            await fetch(getFullUrl(), { method: 'POST' }).then(response => {
              expect(response.status).toEqual(200);
            });

            await fetch(getFullUrl(), { method: 'GET' }).then(response => {
              expect(response.status).toEqual(404);
            });

            return tearDown(server);
          });
        });
      });
    });
  });
});
