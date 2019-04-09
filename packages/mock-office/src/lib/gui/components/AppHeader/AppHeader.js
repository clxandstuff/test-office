import React from 'react';
import PropTypes from 'prop-types';
import { StateFilePickerConnect } from '../StateFilePicker';

const AppHeader = ({ onExportButtonClick }) => (
  <div className="app-header">
    <button className="app-header__button" onClick={onExportButtonClick}>
      Export state
    </button>
    <div className="app-header__button">
      <StateFilePickerConnect />
    </div>
  </div>
);

AppHeader.propTypes = {
  onExportButtonClick: PropTypes.func.isRequired
};

export default AppHeader;
