import 'rxjs/operator/map';
import 'rxjs/operator/mergeMap';
import { combineEpics } from 'redux-observable';
import { createClearExpiredNotificationsEpic } from 'xync';
import addServerEpic from './addServer';
import addHttpBehaviourEpic from './addBehaviour';
import { removeBehaviourEpic } from './removeBehaviour';
import addBehaviourFromFileEpic from './importBehaviour';
import removeServerEpic from './removeServer';
import exportStateEpic from './exportState/exportStateEpic';
import editServerFormSave from './editServerFormSave';
import toggleServer from './toggleServer';
import loadStateOnStart from './loadStateOnStart';
import syncWithApp from './syncWithApp';
import triggerRecordMode from './triggerRecordMode';
import importState from './importState';

export default combineEpics(
  addServerEpic,
  removeBehaviourEpic,
  addBehaviourFromFileEpic,
  removeServerEpic,
  exportStateEpic,
  addHttpBehaviourEpic,
  editServerFormSave,
  toggleServer,
  createClearExpiredNotificationsEpic(),
  loadStateOnStart,
  syncWithApp,
  triggerRecordMode,
  importState
);
