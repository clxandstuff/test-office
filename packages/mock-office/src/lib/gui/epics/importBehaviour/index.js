import { ifElse, has } from 'ramda';
import { FILE_PICKED } from '../../components/FilePicker';
import mockOfficeService from '../../resources/mockOfficeService';

export const SUCCEEDED = 'importBehaviour/SUCCEEDED';
export const succeededAction = (serverId, behaviours) => ({
  type: SUCCEEDED,
  serverId,
  behaviours
});
export const FAILED = 'importBehaviour/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});

export const hasError = has('error');
const readFromFile = action => {
  const { serverId, files } = action;
  const file = files[0];

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e =>
      resolve({
        behaviours: JSON.parse(e.target.result),
        serverId
      });
  });
};
const makeRequests = requestParams =>
  Promise.all(
    requestParams.behaviours.map(behaviour =>
      mockOfficeService.addBehaviour(requestParams.serverId, behaviour)
    )
  )
    .then(behaviours => ({
      behaviours,
      serverId: requestParams.serverId
    }))
    .catch(error => ({ error: error.message }));
const onFail = ({ error }) => failedAction(error);
const onSuccess = ({ behaviours, serverId }) =>
  succeededAction(serverId, behaviours);

export default action$ =>
  action$
    .ofType(FILE_PICKED)
    .flatMap(readFromFile)
    .flatMap(makeRequests)
    .map(ifElse(hasError, onFail, onSuccess));
