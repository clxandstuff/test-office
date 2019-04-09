export const SUCCEED = 'addBehaviour/SUCCEEDED';
export const succeedAction = (serverId, behaviour) => ({
  type: SUCCEED,
  serverId,
  behaviour
});
export const FAILED = 'addBehaviour/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});
