export const SUCCEEDED = 'startServer/SUCCEEDED';
export const FAILED = 'startServer/FAILED';

export const succeededAction = id => ({
  type: SUCCEEDED,
  id
});

export const failedAction = reason => ({
  type: FAILED,
  reason
});
