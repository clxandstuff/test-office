import { connect } from 'react-redux';
import { switchButtonClickedAction } from './actions';
import ServerViewHeaderToggle from './ServerViewHeaderToggle';

const serverToggleMapDispatchToProps = {
  onSwitchButtonClick: switchButtonClickedAction
};

export default connect(null, serverToggleMapDispatchToProps)(
  ServerViewHeaderToggle
);
