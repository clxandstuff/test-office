export const SUCCEEDED = 'addServer/SUCCEED';
export const FAILED = 'addServer/FAILED';

export const succeededAction = payload => ({
  type: SUCCEEDED,
  payload
});

export const failedAction = reason => ({
  type: FAILED,
  reason
});
