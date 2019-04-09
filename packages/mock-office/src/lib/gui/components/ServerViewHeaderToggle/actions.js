export const SWITCH_BUTTON_CLICKED =
  'ServerViewHeaderToggle/SWITCH_BUTTON_CLICKED';
export const switchButtonClickedAction = (id, isOn) => ({
  type: SWITCH_BUTTON_CLICKED,
  id,
  isOn
});
