import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as entitiesReducer } from './entities';
import notificationsReducer from './notifications';
import { reducer as sidebarReducer } from './sidebar';
import modalReducer from './modal';
import addBehaviourReducer from './addBehaviour';

export default combineReducers({
  routing: routerReducer,
  entities: entitiesReducer,
  xync: notificationsReducer,
  form: formReducer,
  sidebar: sidebarReducer,
  modal: modalReducer,
  addBehaviour: addBehaviourReducer
});
