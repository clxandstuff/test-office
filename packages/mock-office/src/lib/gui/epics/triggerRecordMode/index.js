import { Observable } from 'rxjs/Observable';
import { RECORD_MODE_TRIGGER_CLICKED } from '../../components/ServerViewHeader';
import mockOfficeService from '../../resources/mockOfficeService';
import { succeededAction, failedAction } from './actions';

export default action$ =>
  action$.ofType(RECORD_MODE_TRIGGER_CLICKED).flatMap(action =>
    Observable.from(
      mockOfficeService.editServer(action.serverId, {
        recordMode: action.recordModeChecked
      })
    )
      .map(payload => succeededAction(payload))
      .catch(e => Observable.from(failedAction(e.message)))
  );
