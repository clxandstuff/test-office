export const FORM_SUBMITTED = 'EditServerForm/FORM_SUBMITTED';
export const formSubmittedAction = (id, values) => ({
  type: FORM_SUBMITTED,
  id,
  values
});
