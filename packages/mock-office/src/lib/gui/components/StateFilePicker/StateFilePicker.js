import React from 'react';
import PropTypes from 'prop-types';

export default class StateFilePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.files.length) {
      this.props.onFileChange(e.target.files);
    }
  }

  render() {
    const { handleChange } = this;

    return (
      <div className="state-file-picker">
        <label
          className="state-file-picker__label"
          htmlFor="state-file-picker__input"
        >
          Import state
        </label>
        <input
          id="state-file-picker__input"
          className="state-file-picker__input"
          type="file"
          onChange={handleChange}
          value=""
        />
      </div>
    );
  }
}
StateFilePicker.propTypes = {
  onFileChange: PropTypes.func.isRequired
};
