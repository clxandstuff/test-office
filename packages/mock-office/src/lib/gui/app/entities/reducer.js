import { mergeDeepRight, omit } from 'ramda';
import { Server } from './recordTypes';
import { SUCCEEDED as ADD_SERVER_SUCCEED } from '../../epics/addServer/actions';
import { SUCCEEDED as EDIT_SERVER_SUCCEEDED } from '../../epics/editServerFormSave/actions';
import { SUCCEEDED as REMOVE_SERVER_SUCCEEDED } from '../../epics/removeServer/actions';
import { SUCCEEDED as REMOVE_BEHAVIOUR_DID_SUCCEED } from '../../epics/removeBehaviour';
import {
  REACTIONS_ENDED,
  REACTIONS_DID_RUN_ACTION,
  REACTIONS_CANCELLED
} from '../../epics/syncWithApp/actions';
import { SUCCEEDED as IMPORT_BEHAVIOURS_SUCCEEDED } from '../../epics/importBehaviour';
import { SUCCEED as ADD_BEHAVIOUR_SUCCEED } from '../../epics/addBehaviour/actions';
import { SUCCEEDED as START_SERVER_SUCCEED } from '../../epics/startServer/actions';
import { SUCCEEDED as STOP_SERVER_SUCCEED } from '../../epics/stopServer/actions';
import { SUCCEEDED as LOAD_STATE_ON_APP_START } from '../../epics/loadStateOnStart/actions';
import { SUCCEEDED as TRIGGER_RECORD_MODE_SUCCEEDED } from '../../epics/triggerRecordMode/actions';
import { SUCCEEDED as IMPORT_STATE_SUCCEEDED } from '../../epics/importState/actions';

export const initialState = {
  servers: {
    ids: [],
    entities: {}
  },
  reactions: {
    ids: [],
    entities: {}
  },
  behaviours: {
    ids: [],
    entities: {}
  }
};

export const reducers = {
  addServer(state, id, params) {
    const server = new Server({
      id,
      name: params.name,
      port: params.port,
      type: params.type,
      secure: params.secure,
      fallbackUrl: params.fallbackUrl,
      recordMode: params.recordMode
    });

    return mergeDeepRight(state, {
      servers: {
        entities: {
          [id]: server
        },
        ids: [...state.servers.ids, id]
      }
    });
  },
  startServer(state, id) {
    return mergeDeepRight(state, {
      servers: {
        entities: {
          [id]: {
            running: true
          }
        }
      }
    });
  },
  stopServer(state, id) {
    return mergeDeepRight(state, {
      servers: {
        entities: {
          [id]: {
            running: false
          }
        }
      }
    });
  },
  removeServer(state, id) {
    return mergeDeepRight(state, {
      servers: {
        ids: state.servers.ids.filter(serverId => serverId !== id),
        entities: omit([id], state.servers.entities)
      }
    });
  },
  updateServer(state, id, params) {
    return mergeDeepRight(state, {
      servers: {
        entities: {
          [id]: params
        }
      }
    });
  },
  addBehaviour(state, serverId, params) {
    const behaviour = Object.assign({ expired: false }, params, {
      reactions: []
    });

    return mergeDeepRight(state, {
      behaviours: {
        entities: {
          [params.id]: behaviour
        },
        ids: [...state.behaviours.ids, params.id]
      },
      servers: {
        entities: {
          [serverId]: {
            behaviours: [
              ...state.servers.entities[serverId].behaviours,
              params.id
            ]
          }
        }
      }
    });
  },
  addReaction(state, behaviourId, reaction) {
    return mergeDeepRight(state, {
      behaviours: {
        entities: {
          [behaviourId]: {
            reactions: [
              ...state.behaviours.entities[behaviourId].reactions,
              reaction.id
            ]
          }
        }
      },
      reactions: {
        ids: [...state.reactions.ids, reaction.id],
        entities: {
          [reaction.id]: reaction
        }
      }
    });
  },
  removeBehaviour(state, serverId, behaviourId) {
    const reactions = state.behaviours.entities[behaviourId].reactions;
    let newState = state;

    newState = reactions.reduce(
      (acc, next) => reducers.removeReaction(acc, behaviourId, next),
      newState
    );

    return mergeDeepRight(newState, {
      behaviours: {
        ids: newState.behaviours.ids.filter(id => id !== behaviourId),
        entities: omit([behaviourId], newState.behaviours.entities)
      },
      servers: {
        entities: {
          [serverId]: {
            behaviours: newState.servers.entities[serverId].behaviours.filter(
              mId => mId !== behaviourId
            )
          }
        }
      }
    });
  },
  removeReaction(state, behaviour, id) {
    return mergeDeepRight(state, {
      reactions: {
        ids: state.reactions.ids.filter(reactionId => reactionId !== id),
        entities: omit([id], state.reactions.entities)
      },
      behaviours: {
        entities: {
          [behaviour]: {
            reactions: state.behaviours.entities[behaviour].reactions.filter(
              reactionId => reactionId !== id
            )
          }
        }
      }
    });
  },
  cancelReactions(state, id) {
    return mergeDeepRight(state, {
      behaviours: {
        entities: {
          [id]: {
            pending: false
          }
        }
      }
    });
  },
  endReactions(state, id) {
    const runCounter = state.behaviours.entities[id].runCounter;
    const loadedCounter = state.behaviours.entities[id].loadedCounter;

    return mergeDeepRight(state, {
      behaviours: {
        entities: {
          [id]: {
            pending: false,
            runCounter: runCounter + 1,
            expired: runCounter + 1 === loadedCounter
          }
        }
      }
    });
  },
  runBehaviour(state, id) {
    return mergeDeepRight(state, {
      behaviours: {
        entities: {
          [id]: {
            pending: true
          }
        }
      }
    });
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REACTIONS_CANCELLED: {
      const { id } = action;
      return reducers.cancelReactions(state, id);
    }
    case REACTIONS_ENDED: {
      const { id } = action;
      return reducers.endReactions(state, id);
    }
    case REACTIONS_DID_RUN_ACTION: {
      const { id } = action;
      return reducers.runBehaviour(state, id);
    }
    case ADD_SERVER_SUCCEED: {
      const { payload } = action;
      let newState = state;
      newState = reducers.addServer(newState, payload.id, payload);
      return newState;
    }
    case EDIT_SERVER_SUCCEEDED: {
      return reducers.updateServer(state, action.result.id, action.result);
    }
    case IMPORT_STATE_SUCCEEDED:
    case LOAD_STATE_ON_APP_START: {
      const { servers } = action;
      let newState = initialState;

      servers.forEach(serverParams => {
        newState = reducers.addServer(newState, serverParams.id, serverParams);
        if (serverParams.running) {
          newState = reducers.startServer(newState, serverParams.id);
        }

        serverParams.behaviours.forEach(behaviour => {
          newState = reducers.addBehaviour(
            newState,
            serverParams.id,
            behaviour
          );

          behaviour.reactions.forEach(reaction => {
            newState = reducers.addReaction(newState, behaviour.id, reaction);
          });
        });
      });

      return newState;
    }
    case REMOVE_SERVER_SUCCEEDED: {
      let newState = state;
      const { id } = action;
      const server = state.servers.entities[id];
      newState = reducers.removeServer(newState, server.id);

      return newState;
    }
    case REMOVE_BEHAVIOUR_DID_SUCCEED: {
      return reducers.removeBehaviour(
        state,
        action.serverId,
        action.behaviourId
      );
    }
    case IMPORT_BEHAVIOURS_SUCCEEDED: {
      const { behaviours, serverId } = action;
      let newState = state;
      behaviours.forEach(behaviour => {
        newState = reducers.addBehaviour(newState, serverId, behaviour);

        behaviour.reactions.forEach(reaction => {
          newState = reducers.addReaction(newState, behaviour.id, reaction);
        });
      });
      return newState;
    }
    case ADD_BEHAVIOUR_SUCCEED: {
      const { behaviour, serverId } = action;
      let newState = state;
      newState = reducers.addBehaviour(newState, serverId, behaviour);
      behaviour.reactions.forEach(reaction => {
        newState = reducers.addReaction(newState, behaviour.id, reaction);
      });
      return newState;
    }
    case START_SERVER_SUCCEED: {
      return reducers.startServer(state, action.id);
    }
    case STOP_SERVER_SUCCEED: {
      return reducers.stopServer(state, action.id);
    }
    case TRIGGER_RECORD_MODE_SUCCEEDED: {
      return reducers.updateServer(state, action.result.id, action.result);
    }
    default: {
      return state;
    }
  }
};
