import React from 'react';
import { AddServerFormConnect } from '../AddServerForm';
import serverIcon from '../../../../../assets/icons_gray_server.svg';

const AddServerModal = () => (
  <div>
    <div className="modal-header">
      <img className="modal-header__icon" src={serverIcon} alt="" />
      <div className="modal-header__label">Add server</div>
    </div>
    <div className="modal-content">
      <AddServerFormConnect />
    </div>
  </div>
);

export default AddServerModal;
