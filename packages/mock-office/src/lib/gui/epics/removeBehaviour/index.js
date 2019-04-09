import { Observable } from 'rxjs';
import mockOfficeService from '../../resources/mockOfficeService';
import { REMOVE_BUTTON_CLICKED as HTTP_REMOVE_BUTTON_CLICKED } from '../../components/HttpBehaviourListItem';
import { REMOVE_BUTTON_CLICKED as WS_REMOVE_BUTTON_CLICKED } from '../../components/WsBehaviourListItem';

export const SUCCEEDED = 'removeBehaviour/SUCCEEDED';
const succeededAction = (serverId, behaviourId) => ({
  type: SUCCEEDED,
  serverId,
  behaviourId
});
export const FAILED = 'removeBehaviour/FAILED';
const failedAction = reason => ({
  type: FAILED,
  reason
});

export const removeBehaviourEpic = action$ =>
  action$
    .ofType(HTTP_REMOVE_BUTTON_CLICKED, WS_REMOVE_BUTTON_CLICKED)
    .flatMap(action =>
      Observable.from(
        mockOfficeService.removeBehaviour(action.behaviourId, action.serverId)
      )
        .map(() => succeededAction(action.serverId, action.behaviourId))
        .catch(({ message }) => failedAction(message))
    );
