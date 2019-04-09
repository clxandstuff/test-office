import { Subject, Observable } from 'rxjs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import Expectation from './Expectation';

const requestToExpectation = req => ({
  path: req.originalUrl,
  method: req.method,
  headers: req.headers
});

export default class MockServer {
  constructor(config) {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.port = config.port || 3000;
    this.expectations = [];
    this.add = this.add.bind(this);

    this.request$ = new Subject().flatMap(({ req, res, expectations }) => {
      const expectation = expectations.find(exp =>
        exp.match(requestToExpectation(req))
      );

      if (expectation) {
        return expectation.action$().map(response => {
          if (response.headers) {
            res.set(response.headers);
          }

          if (response.status) {
            res.status(response.status);
          }

          if (response.body) {
            const body =
              typeof response.body !== 'string'
                ? JSON.stringify(response.body)
                : response.body;
            res.write(body);
          }

          return res;
        });
      }

      res.status(404);
      return Observable.of({
        res,
        body: 'Response for your request not found'
      });
    });

    this.server = http.createServer(
      express()
        .use(cors())
        .use((req, res, next) =>
          this.request$.next({
            req,
            res,
            next,
            expectations: this.expectations
          })
        )
    );
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, () => {
        this.subscription = this.request$.subscribe(res => {
          res.end();
        });
        resolve();
      });
      this.server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
          reject(`Port ${err.port} is in use. Choose different port.`);
        }
      });
    });
  }

  stop() {
    return new Promise(resolve => {
      this.server.close(() => {
        if (this.subscription && !this.subscription.closed) {
          this.subscription.unsubscribe();
        }
        resolve();
      });
    });
  }

  add(config) {
    this.expectations.push(
      new Expectation(
        config.request,
        incRequest => {
          if (config.request.path && config.request.path !== incRequest.path) {
            return false;
          }

          if (
            config.request.method &&
            config.request.method !== incRequest.method
          ) {
            return false;
          }

          if (config.request.headers) {
            const difference = Object.keys(config.request.headers).find(
              k => config.request.headers[k] !== incRequest.headers[k]
            );

            if (difference) {
              return false;
            }
          }

          return true;
        },
        [config.response]
      )
    );
  }
}