import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
  FormSection,
  FieldArray,
  SubmissionError
} from 'redux-form';
import Select from 'react-select';
import ResponseReactionSection from './ResponseReactionSection';
import { submitSucceededAction, submitFailedAction } from './actions';

const EventTypeField = field => (
  <Select
    value={field.input.value}
    onChange={option => field.input.onChange(option.value)}
    searchable={false}
    clearable={false}
    className="form-field__select"
    options={[{ value: 'request', label: 'request' }]}
  />
);

// eslint-disable-next-line react/prop-types
const renderReactions = ({ fields }) => (
  <div>
    {fields.map((name, index) => (
      <div className="form-section" key={index}>
        <FormSection name={name}>
          <ResponseReactionSection />
        </FormSection>
      </div>
    ))}
  </div>
);

export const AddBehaviourForm = props => (
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
    <FieldArray component={renderReactions} name="reactions" />
    <div className="form-row">
      <button className="button form__button" type="submit">
        Submit
      </button>
    </div>
  </form>
);

AddBehaviourForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'addHttpBehaviour',
  initialValues: {
    event: {
      type: 'request'
    },
    reactions: [
      {
        type: 'response'
      }
    ]
  },
  onSubmit(values, dispatch) {
    if (values.reactions[0].params) {
      try {
        JSON.parse(values.reactions[0].params);
      } catch (e) {
        dispatch(submitFailedAction('reactions[0].params: Invalid json'));
        throw new SubmissionError({ 'reactions[0].params': 'Invalid json' });
      }
    }

    if (values.event.params) {
      try {
        JSON.parse(values.event.params);
      } catch (e) {
        dispatch(submitFailedAction('event.params: Invalid json'));
        throw new SubmissionError({ 'event.params': 'Invalid json' });
      }
    }

    return values;
  },
  onSubmitSuccess(values, dispatch, props) {
    dispatch(submitSucceededAction(values, props.serverId));
  }
})(AddBehaviourForm);
