export const REACTIONS_ENDED = 'syncWithApp/REACTIONS_ENDED';
export const reactionsEndedAction = id => ({
  type: REACTIONS_ENDED,
  id
});
export const REACTIONS_DID_RUN_ACTION = 'syncWithApp/REACTIONS_DID_RUN_ACTION';
export const reactionsDidRunAction = id => ({
  type: REACTIONS_DID_RUN_ACTION,
  id
});
export const REACTIONS_CANCELLED = 'syncWithApp/REACTIONS_CANCELLED';
export const reactionsCancelledAction = id => ({
  type: REACTIONS_CANCELLED,
  id
});
export const APP_SYNC_STARTED = 'syncWithApp/APP_SYNC_STARTED';
export const appSyncStartedAction = () => ({
  type: APP_SYNC_STARTED
});
