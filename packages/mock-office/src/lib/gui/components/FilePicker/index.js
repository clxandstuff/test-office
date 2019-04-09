import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uploadIcon from '../../../../../assets/icons_gray_upload@3x.svg';

export const FILE_PICKED = 'component/FilePicker/FILE_PICKED';
export const filePickedAction = (serverId, files) => ({
  type: FILE_PICKED,
  serverId,
  files
});

export class FilePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.files.length) {
      this.props.onFileChange(this.props.serverId, e.target.files);
    }
  }

  render() {
    const { handleChange } = this;

    return (
      <div className="file-picker">
        <label
          className="file-picker__button inspect-server-behaviours-header__button"
          htmlFor="file-picker__input"
        >
          <img
            src={uploadIcon}
            role="presentation"
            style={{ marginRight: '11px' }}
          />
          Import from file
        </label>
        <input
          id="file-picker__input"
          className="file-picker__input"
          type="file"
          onChange={handleChange}
          value=""
        />
      </div>
    );
  }
}
FilePicker.propTypes = {
  serverId: PropTypes.string.isRequired,
  onFileChange: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onFileChange: filePickedAction
};
export default connect(null, mapDispatchToProps)(FilePicker);
