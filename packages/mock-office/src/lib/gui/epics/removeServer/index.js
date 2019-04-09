import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import mockOfficeService from '../../resources/mockOfficeService';
import { REMOVE_BUTTON_CLICKED } from '../../components/ServerViewHeader/actions';
import { currentDisplayedServerSelector } from '../../app/sidebar';
import { failedAction, succeededAction } from './actions';

const onSuccess = (id, store) => {
  const state = store.getState();
  const actions = [];
  const displayedServerId = currentDisplayedServerSelector(state);
  if (displayedServerId === id) {
    actions.push(push('/'));
  }
  actions.push(succeededAction(id));
  return actions;
};

export default (action$, store) =>
  action$.ofType(REMOVE_BUTTON_CLICKED).flatMap(action =>
    Observable.from(mockOfficeService.removeServer(action.id))
      .flatMap(() => onSuccess(action.id, store))
      .catch(e => Observable.of(failedAction(e.message)))
  );
