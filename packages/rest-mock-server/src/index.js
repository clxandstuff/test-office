const express = require('express');
const cors = require('cors');
const http = require('http');

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
    const app = express();
    app.use(cors()).use((req, res) => {
      const mock = find(mocks, getCriteria(req));

      if (!mock) {
        res.status('404').send('Mock not found');
        return;
      }

      if (!mock.response) {
        res.send();
        return;
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
        res.send(mock.response.body);
        return;
      }

      res.send();
    });
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
      resolve(server);
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        throw new Error(`Port ${err.port} is in use. Choose different port.`);
      }
    });
  });
};
