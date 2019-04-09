import React from 'react';
import { Field, FormSection } from 'redux-form';
import Select from 'react-select';

const ReactionTypeField = field => (
  <Select
    value={field.input.value}
    onChange={option => field.input.onChange(option.value)}
    searchable={false}
    clearable={false}
    className="form-field__select"
    options={[{ value: 'message', label: 'message' }]}
  />
);

const AddWsBehaviourFormReactionFormSection = () => (
  <div className="form-section">
    <header className="form-section__header">Reaction:</header>
    <div className="form-row">
      <div className="form__field">
        <Field component={ReactionTypeField} name="type" />
      </div>
    </div>
    <FormSection name="params">
      <div className="form-row">
        <div className="form__field">
          <label className="form-field__label" htmlFor="payload">
            Message:
          </label>
          <Field
            className="form-field__textarea"
            component="textarea"
            name="message"
          />
        </div>
      </div>
    </FormSection>
    <FormSection name="schedule">
      <div className="form-row">
        <div className="form__field">
          <label className="form-field__label" htmlFor="delay">
            Delay(ms):
          </label>
          <Field
            className="form-field__input"
            component="input"
            type="number"
            name="delay"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form__field">
          <label className="form-field__label" htmlFor="interval">
            Interval(ms):
          </label>
          <Field
            className="form-field__input"
            component="input"
            type="number"
            name="interval"
          />
        </div>
      </div>
    </FormSection>
  </div>
);

export default AddWsBehaviourFormReactionFormSection;
