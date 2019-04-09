import { connect } from 'react-redux';
import { filePickedAction } from './actions';
import StateFilePicker from './StateFilePicker';

const mapDispatchToProps = {
  onFileChange: filePickedAction
};
export default connect(null, mapDispatchToProps)(StateFilePicker);
