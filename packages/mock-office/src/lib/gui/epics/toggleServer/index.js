import { Observable } from 'rxjs';
import { ifElse } from 'ramda';
import { SWITCH_BUTTON_CLICKED } from '../../components/ServerViewHeaderToggle/actions';
import startServer from '../startServer';
import stopServer from '../stopServer';

const isOn = action => action.isOn;
const onServerOn = action => stopServer(Observable.from([action]));
const onServerOff = action => startServer(Observable.from([action]));

export default action$ =>
  action$
    .ofType(SWITCH_BUTTON_CLICKED)
    .flatMap(ifElse(isOn, onServerOn, onServerOff));
