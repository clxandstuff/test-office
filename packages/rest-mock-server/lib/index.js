const { Observable } = require('rxjs');
const express = require('express');
const cors = require('cors');

exports.start = function start(port = 3000) {
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
    res.json({ message: 'rest-mock-server response' });
  });
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
