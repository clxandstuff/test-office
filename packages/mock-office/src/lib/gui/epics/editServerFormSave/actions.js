export const SUCCEEDED = 'editServerFormSave/SUCCEEDED';
export const FAILED = 'editServerFormSave/FAILED';
export const failedAction = reason => ({
  type: FAILED,
  reason
});
export const succeededAction = result => ({
  type: SUCCEEDED,
  result
});
