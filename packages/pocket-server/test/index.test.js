const fetch = require('isomorphic-fetch');
const { start } = require('../src');

const getFullUrl = (port, path = '') => `http://127.0.0.1:${port}${path}`;
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
  return start(undefined, mocks, config);
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
          const { port } = server.address();

          await fetch(getFullUrl(port, '/a'));
          await tearDown(server);

          expect(logSpy).toHaveBeenCalled();
        });
      });

      describe('when log is function', () => {
        test('calls log function with req', async () => {
          const logMock = jest.fn();
          const server = await setup(defaultMocks, { log: logMock });
          const { port } = server.address();

          await fetch(getFullUrl(port, '/a'));
          await tearDown(server);

          expect(logMock).toHaveBeenCalled();
        });
      });

      describe('when mock not matched', () => {
        test('responds with 404', async () => {
          const server = await setup(defaultMocks);
          const { port } = server.address();

          const response = await fetch(getFullUrl(port, '/unmatched'));
          await tearDown(server);

          expect(response.status).toEqual(404);
        });
      });

      describe('when mock matched', () => {
        test('responds with specified status', async () => {
          const server = await setup(defaultMocks);
          const { port } = server.address();

          const response = await fetch(getFullUrl(port, '/user/1'));
          await tearDown(server);

          expect(response.status).toEqual(201);
        });

        test('responds with specified headers', async () => {
          const server = await setup(defaultMocks);
          const { port } = server.address();

          const response = await fetch(getFullUrl(port, '/user/1'));
          expect(response.headers.get('test-header')).toEqual(
            'test-header-value'
          );
          await tearDown(server);
        });

        test('responds with specified body', async () => {
          const server = await setup(defaultMocks);
          const { port } = server.address();

          const response = await fetch(getFullUrl(port, '/user/1'));
          await tearDown(server);

          return response.json().then(body => {
            expect(body).toEqual({
              user: {
                name: 'John',
                lastName: 'Doe'
              }
            });
          });
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
            const { port } = server.address();
            const response1 = await fetch(getFullUrl(port, '/a'));
            const response2 = await fetch(getFullUrl(port, '/b'));
            await tearDown(server);

            expect(response1.status).toEqual(200);
            expect(response2.status).toEqual(404);
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
            const { port } = server.address();
            const response1 = await fetch(getFullUrl(port), { method: 'POST' });
            const response2 = await fetch(getFullUrl(port), { method: 'GET' });
            await tearDown(server);

            expect(response1.status).toEqual(200);
            expect(response2.status).toEqual(404);
          });
        });
      });
    });
  });
});
