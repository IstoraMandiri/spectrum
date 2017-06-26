import React, { PropTypes, Component } from 'react';
import FormField from '~/components/common/form_field';
import Advanced from '~/components/common/advanced';
import { Form } from 'semantic-ui-react';

export default class TransactionModalForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    form: PropTypes.func,
    renderForm: PropTypes.func,
  }
  static defaultProps = {
    form: undefined,
    renderForm: undefined,
  }
  render() {
    const { renderForm, form: FormComponent, formChange, formData } = this.props;
    return (
      <div>
        {(renderForm && renderForm(this.props)) || (FormComponent && <FormComponent {...this.props} />)}
        <Advanced>
          <Form.Group widths="equal">
            <FormField
              type="number"
              placeholder="e.g. `21000`"
              label="Gas"
              name="gas"
              {...{ formChange, formData }}
            />
            <FormField
              type="number"
              placeholder="e.g. `20000000000`"
              label="Gas Price"
              name="gasPrice"
              {...{ formChange, formData }}
            />
          </Form.Group>
        </Advanced>
      </div>
    );
  }
}
