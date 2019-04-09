import { Observable } from 'rxjs';
import mockOfficeService from '../../resources/mockOfficeService';
import { failedAction, succeededAction } from './actions';

export default action$ =>
  action$.flatMap(action =>
    Observable.from(mockOfficeService.startServer(action.id))
      .map(() => succeededAction(action.id))
      .catch(e => Observable.of(failedAction(e.message)))
  );
