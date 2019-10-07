const { Observable } = require('rxjs');
const { map } = require('rxjs/operators');
const express = require('express');
const cors = require('cors');

function matchPath(mock, req) {
  if (!mock.request || !mock.request.path) {
    return true;
  }

  return mock.request.path === req.path;
}

function find(mocks, criteria) {
  const isTruthy = t => !t === false;

  if (mocks.length < 1) {
    return undefined;
  }

  return mocks.find(mock => {
    return [matchPath(mock, criteria)].every(isTruthy);
  });
}

function getCriteria(req) {
  return {
    path: req.url
  };
}

exports.start = function start(port = 3000, mocks = []) {
  return new Promise(resolve => {
    const request$ = Observable.create(subscriber => {
      const app = express();
      app.use(cors()).use((req, res) =>
        subscriber.next({
          req,
          res
        })
      );
      const server = app.listen(port, () => {
        resolve(port);
      });

      server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
          throw new Error(`Port ${err.port} is in use. Choose different port.`);
        }
      });
    });

    const mockResponse = ({ req, res }) => {
      const mock = find(mocks, getCriteria(req));

      if (!mock) {
        return {
          body: 'Mock not found',
          res
        };
      }

      if (!mock.response) {
        return {
          res
        };
      }

      if (mock.response.status) {
        res.status(mock.response.status);
      }

      if (mock.response.headers) {
        res.set(mock.response.headers);
      }

      if (mock.response.cookies && mock.response.cookies.length > 0) {
        mock.response.cookies.forEach(cookie => {
          res.cookie(cookie.name, cookie.value, cookie.options);
        });
      }

      if (mock.response.body) {
        return {
          res,
          body: mock.response.body
        };
      }

      return {
        res
      };
    };

    const send = ({ body, res }) => {
      res.send(body);
    };

    request$.pipe(map(mockResponse)).subscribe(send);
  });
};
