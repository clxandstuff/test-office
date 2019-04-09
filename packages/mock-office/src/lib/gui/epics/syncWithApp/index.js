import { Observable } from 'rxjs';
import {
  reactionsEndedAction,
  reactionsDidRunAction,
  reactionsCancelledAction,
  appSyncStartedAction
} from './actions';
import { START } from '../../actions';
import eventsServer from '../../resources/eventsServer';

function startAppSync(ws, store) {
  Observable.fromEventPattern(
    handler => {
      ws.addEventListener('message', handler);
    },
    handler => {
      ws.removeEventListener('message', handler);
    }
  ).subscribe(message => {
    const data = JSON.parse(message.data);

    switch (data.event) {
      case 'behaviour-status-change': {
        if (data.status === 'finished') {
          store.dispatch(reactionsEndedAction(data.behaviourId));
        } else if (data.status === 'pending') {
          store.dispatch(reactionsDidRunAction(data.behaviourId));
        } else if (data.status === 'cancelled') {
          store.dispatch(reactionsCancelledAction(data.behaviourId));
        }
        break;
      }
      default:
    }
  });
}

export default (action$, store) =>
  action$
    .ofType(START)
    .do(() => {
      startAppSync(eventsServer(), store);
    })
    .map(appSyncStartedAction);
