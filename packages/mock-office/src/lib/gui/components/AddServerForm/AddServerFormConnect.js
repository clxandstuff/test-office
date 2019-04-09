import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import AddServerForm from './AddServerForm';
import { submitSucceededAction } from './actions';

const FORM_NAME = 'addServer';
const INITIAL_VALUES = {
  name: 'Awesome server',
  port: 3000,
  type: 'http'
};
const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  serverType: selector(state, 'type')
}))(
  reduxForm({
    form: FORM_NAME,
    initialValues: INITIAL_VALUES,
    onSubmit: values => values,
    onSubmitSuccess: (values, dispatch) =>
      dispatch(submitSucceededAction(values))
  })(AddServerForm)
);
