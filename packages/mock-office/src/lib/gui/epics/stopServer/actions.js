export const SUCCEEDED = 'stopServer/SUCCEEDED';

export const succeededAction = id => ({
  type: SUCCEEDED,
  id
});

export const FAILED = 'stopServer/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});
