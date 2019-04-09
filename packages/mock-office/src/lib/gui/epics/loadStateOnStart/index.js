import { START } from '../../actions';
import { succeededAction } from './actions';
import mockOfficeService from '../../resources/mockOfficeService';

export default action$ =>
  action$
    .ofType(START)
    .flatMap(mockOfficeService.getState)
    .map(succeededAction);
