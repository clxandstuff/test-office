import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection, FieldArray } from 'redux-form';
import Select from 'react-select';
import MessageReactionSection from './MessageReactionSection';
import { submitSucceededAction } from './actions';

const EventTypeField = field => (
  <Select
    value={field.input.value}
    onChange={option => field.input.onChange(option.value)}
    searchable={false}
    clearable={false}
    className="form-field__select"
    options={[
      { value: 'message', label: 'message' },
      { value: 'connection', label: 'connection' }
    ]}
  />
);
// eslint-disable-next-line react/prop-types
const renderReactionSections = ({ fields }) => (
  <div>
    <div>
      {fields.map((name, index) => (
        <div className="form-section" key={index}>
          <FormSection name={name}>
            <MessageReactionSection />
          </FormSection>
        </div>
      ))}
    </div>
    <button
      type="button"
      className="button form__button"
      onClick={() =>
        fields.push({
          type: 'message'
        })
      }
    >
      Add message
    </button>
  </div>
);

export const AddWsBehaviourForm = props => (
  <form className="form" onSubmit={props.handleSubmit}>
    <div className="form-section">
      <div className="form-row">
        <div className="form__field">
          <label className="form-field__label" htmlFor="loadedCounter">
            How many times do you want to use it:
          </label>
          <Field
            className="form-field__input"
            component="input"
            type="number"
            name="loadedCounter"
            normalize={value => parseInt(value, 10)}
          />
        </div>
      </div>
    </div>
    <FormSection name="event">
      <section className="form-section">
        <header className="form-section__header">Event:</header>
        <div className="form-row">
          <div className="form__field">
            <label className="form-field__label" htmlFor="event">
              Event type:
            </label>
            <Field name="type" component={EventTypeField} />
          </div>
        </div>
        <div className="form-row">
          <div className="form__field">
            <label className="form-field__label" htmlFor="trigger.params">
              Params:
            </label>
            <Field
              className="form-field__textarea"
              name="params"
              component="textarea"
              cols="30"
              rows="5"
            />
          </div>
        </div>
      </section>
    </FormSection>
    <section className="form-section">
      <header className="form-section__header">Reactions:</header>
      <FieldArray component={renderReactionSections} name="reactions" />
    </section>
    <div className="form-row">
      <button className="button form__button" type="submit">
        Submit
      </button>
    </div>
  </form>
);

AddWsBehaviourForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'addWsBehaviour',
  initialValues: {
    reactions: [
      {
        type: 'message'
      }
    ]
  },
  onSubmit(values) {
    return values;
  },
  onSubmitSuccess(values, dispatch, props) {
    dispatch(submitSucceededAction(values, props.serverId));
  }
})(AddWsBehaviourForm);
