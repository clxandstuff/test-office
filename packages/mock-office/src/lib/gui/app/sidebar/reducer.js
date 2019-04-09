import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  currentDisplayedServerId: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const splitPathName = action.payload.pathname.split('/');
      let serverId;
      splitPathName.forEach((urlPart, index) => {
        if (splitPathName[index - 1] && splitPathName[index - 1] === 'server') {
          serverId = urlPart;
        }
      });

      if (serverId) {
        return {
          currentDisplayedServerId: serverId
        };
      }

      return {
        currentDisplayedServerId: ''
      };
    }
    default: {
      return state;
    }
  }
}
