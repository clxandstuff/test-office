export const SUBMIT_SUCCEEDED = 'AddHttpBehaviourForm/SUBMIT_SUCCEEDED';
export const submitSucceededAction = (values, serverId) => ({
  type: SUBMIT_SUCCEEDED,
  values,
  serverId
});

export const SUBMIT_FAILED = 'AddHttpBehaviourForm/SUBMIT_FAILED';
export const submitFailedAction = reason => ({
  type: SUBMIT_FAILED,
  reason
});
