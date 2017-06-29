import React, { PropTypes, Component } from 'react';
import FormField from '~/components/common/form_field';
import Advanced from '~/components/common/advanced';
import { Form } from 'semantic-ui-react';

import Web3Connect from '~/helpers/web3/connect';

class TransactionModalForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    form: PropTypes.func,
    disableAdvanced: PropTypes.bool,
    renderForm: PropTypes.func,
  }
  static defaultProps = {
    form: undefined,
    renderForm: undefined,
    disableAdvanced: false,
  }
  render() {
    const { disableAdvanced, renderForm, form: FormComponent, formChange, formData } = this.props;
    return (
      <div>
        {(renderForm && renderForm(this.props)) || (FormComponent && <FormComponent {...this.props} />)}
        {!disableAdvanced &&
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
              <FormField
                type="number"
                placeholder="Leave empty to auto-detect"
                label="Nonce"
                name="nonce"
                {...{ formChange, formData }}
              />
            </Form.Group>
          </Advanced>
        }
      </div>
    );
  }
}

export default Web3Connect(TransactionModalForm);
