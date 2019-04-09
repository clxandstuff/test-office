import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import serverIcon from '../../../../../assets/icons_gray_server.svg';
import { serverSelector } from '../../app/entities/index';
import { formSubmittedAction } from './actions';

export const EditServerForm = props => (
  <form className="form" action="#" onSubmit={props.handleSubmit}>
    <div className="form__header">
      <img className="form__header-icon" src={serverIcon} alt="" />
      Edit server
    </div>
    <div className="form-row">
      <div className="form__field">
        <label className="form-field__label" htmlFor="server-name">
          Name:
        </label>
        <Field
          component="input"
          className="form-field__input"
          name="name"
          type="text"
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form__col">
        <div className="form__field">
          <label className="form-field__label" htmlFor="server-port">
            Port:
          </label>
          <Field
            component="input"
            className="form-field__input"
            name="port"
            type="number"
            normalize={value => parseInt(value, 10)}
          />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form__col">
        <div className="form__field">
          <label className="form-field__label" htmlFor="server-port">
            Fallback url:
          </label>
          <Field
            component="input"
            className="form-field__input"
            name="fallbackUrl"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="form-row">
      <button className="button form__button" type="submit">
        Save
      </button>
      <Link to={`/server/${props.serverId}`} className="button form__button">
        Cancel
      </Link>
    </div>
  </form>
);

EditServerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => dispatch(formSubmittedAction(ownProps.serverId, values))
});

const mapStateToProps = (state, ownProps) => {
  const server = serverSelector(state, ownProps.serverId);

  return {
    initialValues: {
      name: server.name,
      port: server.port,
      fallbackUrl: server.fallbackUrl
    }
  };
};

export const EditServerFormConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'editServer'
  })(EditServerForm)
);
