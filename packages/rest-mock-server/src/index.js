const { Observable } = require('rxjs');
const express = require('express');
const cors = require('cors');

exports.start = function start(port = 3000, mocks = []) {
  new Observable(subscriber => {
    const app = express();
    app.use(cors()).use((req, res, next) =>
      subscriber.next({
        req,
        res,
        next
      })
    );
    const server = app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        throw new Error(`Port ${err.port} is in use. Choose different port.`);
      }
    });
  }).subscribe(({ res }) => {
    if (mocks.length === 0) {
      res.status(400).end('rest-mock-server: mocks are empty');
      return;
    }

    res.json(mocks[0]);
  });
};
