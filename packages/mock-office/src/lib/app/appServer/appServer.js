import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import colors from 'colors/safe';
import addServerMiddleware from './middlewares/addServerMiddleware';
import removeServerMiddleware from './middlewares/removeServerMiddleware';
import startServerMiddleware from './middlewares/startServerMiddleware';
import stopServerMiddleware from './middlewares/stopServerMiddleware';
import editServerMiddleware from './middlewares/editServerMiddleware';
import addBehaviourMiddleware from './middlewares/addBehaviourMiddleware';
import removeBehaviourMiddleware from './middlewares/removeBehaviourMiddleware';
import exportMiddleware from './middlewares/exportMiddleware';
import getBehaviourMiddleware from './middlewares/getBehaviourMiddleware';
import configurePersistentState from './configurePersistentState';
import getStateMiddleware from './middlewares/getStateMiddleware';
import importMiddleware from './middlewares/importMiddleware';

const persistentState = configurePersistentState();
persistentState.restore();

export const createAppServer = () => {
  const app = express();
  app.use(cors());

  app.post('/add-server', bodyParser.json(), addServerMiddleware);
  app.post('/remove-server', bodyParser.json(), removeServerMiddleware);
  app.post('/start-server', bodyParser.json(), startServerMiddleware);
  app.post('/stop-server', bodyParser.json(), stopServerMiddleware);
  app.post('/edit-server', bodyParser.json(), editServerMiddleware);
  app.post('/add-behaviour', bodyParser.json(), addBehaviourMiddleware);
  app.post('/remove-behaviour', bodyParser.json(), removeBehaviourMiddleware);
  app.get('/export', exportMiddleware);
  app.get('/behaviour', getBehaviourMiddleware);
  app.get('/state', getStateMiddleware);
  app.post('/import', bodyParser.json(), importMiddleware);

  return app;
};

export const serveAppServer = (port, cb) => {
  createAppServer().listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(colors.green(`App address: http://127.0.0.1:${port}`));
    if (typeof cb === 'function') {
      cb();
    }
  });
};
