export const SUCCEEDED = 'removeServer/SUCCEEDED';
export const FAILED = 'removeServer/FAILED';
export const succeededAction = id => ({
  type: SUCCEEDED,
  id
});
export const failedAction = reason => ({
  type: FAILED,
  reason
});
