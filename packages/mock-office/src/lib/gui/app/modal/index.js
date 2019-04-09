import { createReducer, openModal, closeModal } from 'modalo';
import { ADD_BUTTON_CLICKED } from '../../components/SidebarServers';
import { ADD_BEHAVIOUR_BUTTON_CLICKED } from '../../components/ServerViewHeader/actions';
import { FORM_SUBMITTED } from '../../components/AddHttpBehaviourForm';
import { SUCCEED } from '../../epics/addBehaviour/actions';
import { SUCCEEDED as ADD_SERVER_SUCCEED } from '../../epics/addServer/actions';

export default createReducer((state, action) => {
  switch (action.type) {
    case ADD_BUTTON_CLICKED: {
      return openModal(state, 'AddServerModal');
    }
    case ADD_SERVER_SUCCEED: {
      return closeModal(state);
    }
    case ADD_BEHAVIOUR_BUTTON_CLICKED: {
      return openModal(state, 'AddBehaviourModal');
    }
    case FORM_SUBMITTED: {
      return closeModal(state);
    }
    case SUCCEED: {
      return closeModal(state);
    }
    default: {
      return state;
    }
  }
});
