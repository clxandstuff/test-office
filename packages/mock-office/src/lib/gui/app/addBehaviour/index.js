import { ADD_BEHAVIOUR_BUTTON_CLICKED } from '../../components/ServerViewHeader/actions';

const initialState = {
  server: '',
  scenario: '',
  serverType: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BEHAVIOUR_BUTTON_CLICKED: {
      return {
        serverId: action.serverId,
        serverType: action.serverType
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
