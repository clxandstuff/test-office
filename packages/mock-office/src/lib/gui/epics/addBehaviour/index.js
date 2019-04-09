import { Observable } from 'rxjs';
import mockOfficeService from '../../resources/mockOfficeService';
import { SUBMIT_SUCCEEDED as HTTP_BEHAVIOUR_FORM_SUBMIT_SUCCEEDED } from '../../components/AddHttpBehaviourForm/actions';
import { SUBMIT_SUCCEEDED as WS_BEHAVIOUR_FORM_SUBMIT_SUCCEEDED } from '../../components/AddWsBehaviourForm/actions';
import { succeedAction, failedAction } from './actions';

const onSuccess = ({ behaviour, serverId }) =>
  succeedAction(serverId, behaviour);
const onFail = message => failedAction(message);
const makeRequest = action =>
  Observable.from(
    mockOfficeService.addBehaviour(action.serverId, action.values)
  )
    .map(behaviour => ({
      behaviour,
      serverId: action.serverId
    }))
    .map(onSuccess)
    .catch(e => Observable.of(onFail(e.message)));

export default function addBehaviourEpic(action$) {
  return action$
    .ofType(
      HTTP_BEHAVIOUR_FORM_SUBMIT_SUCCEEDED,
      WS_BEHAVIOUR_FORM_SUBMIT_SUCCEEDED
    )
    .flatMap(makeRequest);
}
