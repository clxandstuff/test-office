import { ifElse, has } from 'ramda';
import { FILE_PICKED } from '../../components/StateFilePicker/actions';
import mockOfficeService from '../../resources/mockOfficeService';
import { failedAction, succeededAction } from './actions';

export const hasError = has('error');
const readFromFile = action => {
  const { files } = action;
  const file = files[0];

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => resolve(JSON.parse(e.target.result));
  });
};
const makeRequests = state =>
  mockOfficeService
    .importState(state)
    .then(importedState => importedState)
    .catch(error => ({ error: error.message }));
const onFail = ({ error }) => failedAction(error);
const onSuccess = state => succeededAction(state);

export default action$ =>
  action$
    .ofType(FILE_PICKED)
    .flatMap(readFromFile)
    .flatMap(makeRequests)
    .map(ifElse(hasError, onFail, onSuccess));
