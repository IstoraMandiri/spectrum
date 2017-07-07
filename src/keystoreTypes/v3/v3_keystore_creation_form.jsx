import React, { PropTypes, Component } from 'react';

import { Form } from 'semantic-ui-react';

import FormField from '~/components/common/form_field';
import EntropyField from '~/components/common/entropy_field';
import NetworkTokensSelector from '~/components/common/network_tokens_selector';
import Advanced from '~/components/common/advanced';


export default class V3KeystoreCreationForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
  }
  render() {
    const { formChange, formData } = this.props;
    return (
      <div>
        <FormField placeholder="Nickname for the Address" label="Name" name="name" {...{ formChange, formData }} />
        <Form.Group widths="equal">
          <FormField
            placeholder="Enter Password"
            type="password"
            label="Password"
            name="password"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            {...{ formChange, formData }}
          />
        </Form.Group>
        <NetworkTokensSelector {...{ formChange, formData }} />
        <Advanced>
          <p>Optionally override the default crypto and encryption values (do not prefix hex strings):</p>
          <Form.Group widths="equal">
            <EntropyField label="Private Key (hex)" name="privateKey" {...{ formChange, formData }} />
            <EntropyField bits={128} label="Initialization Vector (hex)" name="iv" {...{ formChange, formData }} />
            <EntropyField label="Salt (hex)" name="salt" {...{ formChange, formData }} />
            <FormField placeholder="1024" type="number" label="Iteration Count" name="n" {...{ formChange, formData }} />
          </Form.Group>
        </Advanced>
      </div>
    );
  }
}
