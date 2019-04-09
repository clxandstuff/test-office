import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { EditServerFormConnect } from '../EditServerForm';

const EditServerPage = props => (
  <div className="edit-server-page">
    <Scrollbars>
      <div className="edit-server-page__form">
        <EditServerFormConnect serverId={props.params.id} />
      </div>
    </Scrollbars>
  </div>
);

EditServerPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

export default EditServerPage;
