import { connect } from 'react-redux';
import ServerViewHeader from './ServerViewHeader';
import {
  removeButtonClickedAction,
  addBehaviourButtonClickedAction,
  recordModeTriggerClickedAction
} from './actions';

const serverMapDispatchToProps = {
  onRemoveButtonClick: removeButtonClickedAction,
  onAddBehaviourButtonClickedAction: addBehaviourButtonClickedAction,
  onRecordModeTriggerClick: recordModeTriggerClickedAction
};

export default connect(null, serverMapDispatchToProps)(ServerViewHeader);
