import { Server as WebSocketServer } from 'ws';
import { Subject } from 'rxjs';
import http from 'http';
import Expectation from './Expectation';

export default class WsWebServer {
  constructor(config) {
    this.port = config.port || 3000;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.expectations = [];
    this.add = this.add.bind(this);
    this.httpServer = http.createServer();
    this.wsServer = new WebSocketServer({ server: this.httpServer });
    this.wsServer.on('error', err => {
      // eslint-disable-next-line no-console
      console.error(err.message);
    });

    this.connection$ = new Subject()
      .map(({ ws }) => {
        const expectation = this.expectations.find(exp =>
          exp.match({ type: 'connection' })
        );

        return {
          ws,
          expectation
        };
      })
      .filter(({ expectation }) => expectation)
      .flatMap(({ ws, expectation }) =>
        expectation.action$().map(message => ({
          ws,
          body: message.body
        }))
      );

    this.message$ = new Subject()
      .map(({ ws, message }) => {
        const expectation = this.expectations.find(exp =>
          exp.match({ type: 'message', message })
        );

        return {
          ws,
          expectation
        };
      })
      .filter(({ expectation }) => expectation)
      .flatMap(({ ws, expectation }) =>
        expectation.action$().map(message => ({
          ws,
          body: message.body
        }))
      );

    this.wsServer.on('connection', ws => {
      this.connection$.next({ ws });

      ws.on('message', message => {
        this.message$.next({ ws, message });
      });

      ws.on('close', () => {
        if (
          this.connectionSubscription &&
          !this.connectionSubscription.closed
        ) {
          this.connectionSubscription.unsubscribe();
        }

        if (this.messagesSubscription && !this.messagesSubscription.closed) {
          this.messagesSubscription.unsubscribe();
        }
      });
    });
  }

  start() {
    return new Promise(resolve => {
      this.httpServer.listen(this.port, () => {
        this.connectionSubscription = this.connection$.subscribe(
          ({ ws, body }) => {
            const messageBody =
              typeof body !== 'string' ? JSON.stringify(body) : body;
            ws.send(messageBody);
          }
        );
        this.messagesSubscription = this.message$.subscribe(({ ws, body }) => {
          console.log('sending', body);
          ws.send(body);
        });
        resolve();
      });
    });
  }

  stop() {
    return new Promise(resolve => {
      if (this.ws) {
        this.ws.terminate();
      }

      if (
        this.connectionsSubscription &&
        !this.connectionsSubscription.closed
      ) {
        this.connectionsSubscription.unsubscribe();
      }

      if (this.messagesSubscription && !this.messagesSubscription.closed) {
        this.messagesSubscription.unsubscribe();
      }

      this.httpServer.close(resolve);
    });
  }

  add(config) {
    let expectation;

    if (config.connection) {
      expectation = {
        type: 'connection'
      };
    } else if (config.incomingMessage) {
      expectation = {
        type: 'message',
        message: config.incomingMessage
      };
    } else {
      throw Error('Unknown expectation');
    }

    this.expectations.push(
      new Expectation(
        expectation,
        event => {
          if (event.type !== expectation.event.type) {
            return false;
          }

          if (
            event.type === 'message' &&
            event.message !== expectation.event.message
          ) {
            return false;
          }

          return true;
        },
        config.messages
      )
    );
  }
}
