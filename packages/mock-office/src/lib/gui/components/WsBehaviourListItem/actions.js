export const REMOVE_BUTTON_CLICKED =
  'WsBehaviourListItem/REMOVE_BUTTON_CLICKED';
export const removeButtonClickedAction = (serverId, behaviourId) => ({
  type: REMOVE_BUTTON_CLICKED,
  serverId,
  behaviourId
});
