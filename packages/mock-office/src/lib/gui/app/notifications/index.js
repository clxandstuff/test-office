import { createReducer, addNotification } from 'xync';
import {
  SUCCEEDED as ADD_SERVER_SUCCEEDED,
  FAILED as ADD_SERVER_FAILED
} from '../../epics/addServer/actions';
import { FAILED as EDIT_SERVER_FORM_SAVE_FAILED } from '../../epics/editServerFormSave/actions';
import {
  FAILED as REMOVE_SERVER_FAILED,
  SUCCEEDED as REMOVE_SERVER_SUCCEEDED
} from '../../epics/removeServer/actions';
import {
  SUCCEEDED as IMPORT_BEHAVIOURS_SUCCEEDED,
  FAILED as IMPORT_BEHAVIOURS_FAILED
} from '../../epics/importBehaviour';
import {
  SUCCEED as ADD_BEHAVIOUR_SUCCEED,
  FAILED as ADD_BEHAVIOUR_FAILED
} from '../../epics/addBehaviour/actions';
import { FAILED as START_SERVER_FAILED } from '../../epics/startServer/actions';
import { FAILED as STOP_SERVER_FAILED } from '../../epics/stopServer/actions';
import { SUBMIT_FAILED } from '../../components/AddHttpBehaviourForm/actions';
import { FAILED as REMOVE_BEHAVIOUR_FAILED } from '../../epics/removeBehaviour';
import { SUCCEEDED as IMPORT_STATE_SUCCEEDED } from '../../epics/importState/actions';

export default createReducer((state, action) => {
  switch (action.type) {
    case ADD_BEHAVIOUR_SUCCEED: {
      return addNotification(state, {
        mood: 'success',
        message: 'Behaviour added'
      });
    }
    case IMPORT_BEHAVIOURS_SUCCEEDED: {
      return addNotification(state, {
        mood: 'success',
        message: 'Behaviours imported'
      });
    }
    case EDIT_SERVER_FORM_SAVE_FAILED:
    case REMOVE_SERVER_FAILED:
    case IMPORT_BEHAVIOURS_FAILED:
    case ADD_BEHAVIOUR_FAILED:
    case REMOVE_BEHAVIOUR_FAILED:
    case ADD_SERVER_FAILED:
    case START_SERVER_FAILED:
    case STOP_SERVER_FAILED:
    case SUBMIT_FAILED: {
      return addNotification(state, {
        mood: 'error',
        message: action.reason
      });
    }
    case REMOVE_SERVER_SUCCEEDED: {
      return addNotification(state, {
        mood: 'success',
        message: 'Server removed'
      });
    }
    case ADD_SERVER_SUCCEEDED: {
      return addNotification(state, {
        mood: 'success',
        message: 'Server added'
      });
    }
    case IMPORT_STATE_SUCCEEDED: {
      return addNotification(state, {
        mood: 'success',
        message: 'State imported.'
      });
    }
    default: {
      return state;
    }
  }
});
