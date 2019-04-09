import { Observable } from 'rxjs';
import { SUBMIT_SUCCEEDED } from '../../components/AddServerForm/actions';
import mockOfficeService from '../../resources/mockOfficeService';
import { succeededAction, failedAction } from './actions';

const onSuccess = payload => succeededAction(payload);
const onFail = message => failedAction(message);
const makeRequest = payload =>
  Observable.from(mockOfficeService.addServer(payload))
    .map(onSuccess)
    .catch(e => Observable.of(onFail(e.message)));

export default action$ =>
  action$
    .ofType(SUBMIT_SUCCEEDED)
    .pluck('values')
    .flatMap(makeRequest);
