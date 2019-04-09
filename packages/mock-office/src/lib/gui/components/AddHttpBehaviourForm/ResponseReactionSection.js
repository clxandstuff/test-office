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
    options={[{ value: 'response', label: 'response' }]}
  />
);

const ResponseReactionSection = () => (
  <div className="form-section">
    <header className="form-section__header">Response:</header>
    <div className="form-section">
      <div className="form-row">
        <div className="form__field">
          <Field component={ReactionTypeField} name="type" />
        </div>
      </div>
      <div className="form-row">
        <div className="form__field">
          <label className="form-field__label" htmlFor="params">
            Params:
          </label>
          <Field
            className="form-field__textarea"
            component="textarea"
            name="params"
          />
        </div>
      </div>
    </div>
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
    </FormSection>
  </div>
);

export default ResponseReactionSection;
