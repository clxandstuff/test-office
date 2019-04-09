export const SUCCEEDED = 'triggerRecordMode/SUCCEEDED';
export const FAILED = 'triggerRecordMode/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});
export const succeededAction = result => ({
  type: SUCCEEDED,
  result
});
