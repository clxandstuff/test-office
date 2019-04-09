export const SUCCEEDED = 'importState/SUCCEEDED';
export const succeededAction = servers => ({
  type: SUCCEEDED,
  servers
});

export const FAILED = 'importState/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});
