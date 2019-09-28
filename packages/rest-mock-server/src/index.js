const { Subject } = require('rxjs');
const express = require('express');
const http = require('http');
const cors = require('cors');

exports.start = function start(port = 3000) {
  const request$ = new Subject();
  const server = http.createServer(
    express()
      .use(cors())
      .use((req, res, next) =>
        request$.next({
          req,
          res,
          next
        })
      )
  );
  let subscription;

  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
    subscription = request$.subscribe(({ res }) => {
      res.end();
    });
  });

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      reject(`Port ${err.port} is in use. Choose different port.`);
    }
  });

  return function stop() {
    server.close(() => {
      subscription.unsubscribe();
    });
  };
};

// export default class RESTMockServer {
//   constructor(config) {
//     const { port = 3000 } = config;
//     this.port = port;
//     this.expectations = [];
//     this.request$ = new Subject();

//     this.server = http.createServer(
//       express()
//         .use(cors())
//         .use((req, res, next) =>
//           this.request$.next({
//             req,
//             res,
//             next
//           })
//         )
//     );
//   }

//   start() {
//     return new Promise((resolve, reject) => {
//       this.server.listen(this.port, () => {
//         this.subscription = this.request$.subscribe(res => {
//           res.end();
//         });
//         resolve();
//       });

//       this.server.on('error', err => {
//         if (err.code === 'EADDRINUSE') {
//           reject(`Port ${err.port} is in use. Choose different port.`);
//         }
//       });
//     });
//   }

//   stop() {
//     return new Promise(resolve => {
//       this.server.close(() => {
//         if (this.subscription && !this.subscription.closed) {
//           this.subscription.unsubscribe();
//         }
//         resolve();
//       });
//     });
//   }
// }
