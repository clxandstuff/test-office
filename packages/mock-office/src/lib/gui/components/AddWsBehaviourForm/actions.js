export const SUBMIT_SUCCEEDED = 'AddWsBehaviourForm/SUBMIT_SUCCEEDED';
export const submitSucceededAction = (values, serverId) => ({
  type: SUBMIT_SUCCEEDED,
  values,
  serverId
});
