import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors/safe';
import createAddExpectation from './middlewares/addExpectation';
import createRemoveExpectation from './middlewares/removeExpectation';
import createExportExpectations from './middlewares/exportExpectations';
import createExpectation from './middlewares/expectation';
import errors from './middlewares/errors';

export default (server, port, cb) => {
  const app = express();

  app.post('/expectation', bodyParser.json(), createAddExpectation(server));
  app.delete(
    '/expectation',
    bodyParser.json(),
    createRemoveExpectation(server)
  );
  app.get('/export', createExportExpectations(server));
  app.get('/expectations', createExpectation(server));
  app.use(errors);

  app.listen(port, err => {
    // eslint-disable-next-line no-console
    if (!err) {
      console.log(
        colors.green(`Admin server started on adress: http://localhost:${port}`)
      );
    }

    if (typeof cb === 'function') {
      cb(err);
    }
  });

  return app;
};
