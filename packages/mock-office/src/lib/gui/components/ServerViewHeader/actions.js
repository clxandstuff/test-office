export const REMOVE_BUTTON_CLICKED = 'ServerViewHeader/REMOVE_BUTTON_CLICKED';
export const removeButtonClickedAction = id => ({
  type: REMOVE_BUTTON_CLICKED,
  id
});
export const ADD_BEHAVIOUR_BUTTON_CLICKED =
  'ServerViewHeader/ADD_BEHAVIOUR_BUTTON_CLICKED';
export const addBehaviourButtonClickedAction = (serverId, serverType) => ({
  type: ADD_BEHAVIOUR_BUTTON_CLICKED,
  serverId,
  serverType
});
export const RECORD_MODE_TRIGGER_CLICKED =
  'ServerViewHeader/RECORD_MODE_TRIGGER_CLICKED';
export const recordModeTriggerClickedAction = (
  serverId,
  recordModeChecked
) => ({
  type: RECORD_MODE_TRIGGER_CLICKED,
  recordModeChecked,
  serverId
});
