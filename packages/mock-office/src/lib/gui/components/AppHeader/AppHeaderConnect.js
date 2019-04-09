import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import {
  exportButtonClickedAction,
  importButtonClickedAction
} from './actions';

export default connect(null, {
  onExportButtonClick: exportButtonClickedAction,
  onImportButtonClick: importButtonClickedAction
})(AppHeader);
