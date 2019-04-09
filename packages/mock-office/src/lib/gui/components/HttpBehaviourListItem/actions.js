export const REMOVE_BUTTON_CLICKED =
  'HttpBehaviourListItem/REMOVE_BUTTON_CLICKED';
export const removeButtonClickedAction = (serverId, behaviourId) => ({
  type: REMOVE_BUTTON_CLICKED,
  serverId,
  behaviourId
});
