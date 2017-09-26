import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import FormField from '~/components/common/form_field';
import DefaultAddressSelector from '~/components/common/default_address_selector';
import AddressInput from '~/components/common/address_input';

export default class MultisigKeystoreDeployForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
  }
  render() {
    const { formData, formChange, formData: { count, owners } } = this.props;
    return (
      <Form.Field>
        <Form.Field>
          <label htmlFor="from">From</label>
          <DefaultAddressSelector />
        </Form.Field>
        <Form.Group widths="equal">
          <FormField
            type="number"
            min={1}
            step={1}
            max={10}
            name="count"
            {...{ formData, formChange }}
            label="Number of Initial Onwers"
          />
          <FormField
            type="number"
            min={1}
            step={1}
            max={10}
            label="Reqruied Quorum for Executions"
            name="required"
            {...{ formData, formChange }}
          />
        </Form.Group>
        <Form.Field>
          <label htmlFor="owners">Owners</label>
          {new Array(parseInt(count, 10) || 0).fill().map((n, i) => (
            <Form.Field>
              <AddressInput
                showQrScanner
                placholder={`Owner ${i} address`}
                value={(owners || [])[i]}
                {...{
                  formChange: ({ target: { value: val } }) => {
                    const value = (owners || []).slice();
                    value[i] = val;
                    return formChange({ target: { name: 'owners', value } });
                  },
                }}
              />
            </Form.Field>
          ))}
        </Form.Field>
      </Form.Field>
    );
  }
}
