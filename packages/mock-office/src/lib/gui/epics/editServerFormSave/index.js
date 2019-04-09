import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import { FORM_SUBMITTED } from '../../components/EditServerForm/actions';
import mockOfficeService from '../../resources/mockOfficeService';
import { failedAction, succeededAction } from './actions';
import {
  InvalidRequestError,
  ResourceNotFoundError,
  UnsupportedStatusError,
  ConnectionError
} from '../../packages/mock-office-service/lib/errors';

const makeRequest = action =>
  Observable.from(mockOfficeService.editServer(action.id, action.values))
    .flatMap(payload => [
      succeededAction(payload),
      push(`/server/${action.id}`)
    ])
    .catch(e => {
      if (
        e instanceof InvalidRequestError ||
        e instanceof UnsupportedStatusError ||
        e instanceof ResourceNotFoundError
      ) {
        return Observable.of(
          failedAction(
            'Something went wrong. Please try again or refresh page.'
          )
        );
      } else if (e instanceof ConnectionError) {
        return Observable.of(failedAction(e.message));
      }

      throw e;
    });

export default function editServerEpic(action$) {
  return action$.ofType(FORM_SUBMITTED).flatMap(makeRequest);
}
