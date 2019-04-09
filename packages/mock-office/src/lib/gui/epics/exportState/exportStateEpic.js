import { EXPORT_BUTTON_CLICKED } from '../../components/AppHeader/actions';
import { succeedAction } from './actions';

export default action$ =>
  action$
    .ofType(EXPORT_BUTTON_CLICKED)
    .map(() => {
      window.location = 'http://127.0.0.1:3060/export';
      return true;
    })
    .mapTo(succeedAction());
