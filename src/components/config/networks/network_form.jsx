import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import FormField from '~/components/common/form_field';
import ColorPicker from '~/components/common/color_picker';
import Advanced from '~/components/common/advanced';

export default class NetworkForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    data: PropTypes.object,
  }
  static defaultProps = {
    data: undefined,
  }
  render() {
    const { formChange, formData, data } = this.props;
    return (
      <Form.Field>
        <Form.Group widths="equal">
          <FormField
            placeholder="e.g. `Ethereum`"
            label="Name"
            name="name"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="e.g. `ETH`"
            label="Symbol"
            name="symbol"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="e.g. `Main Chain`"
            label="Description"
            name="description"
            {...{ formChange, formData }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField
            placeholder="e.g. `https://mainnet.infura.io`"
            label="Provider"
            name="provider"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="e.g. `1`"
            label="Chain ID (EIP 155)"
            name="chainId"
            type="number"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="e.g. `eth-mainnet`"
            label="Unique Identifier"
            name="id"
            readOnly={!!data}
            disabled={!!data}
            {...{ formChange, formData }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <ColorPicker {...{ formData, formChange }} />
          <Form.Field>
            <label htmlFor="enabled">Enabled Status</label>
            <Button
              fluid
              positive={formData.enabled}
              content={formData.enabled ? 'Enabled' : 'Disabled'}
              icon={formData.enabled ? 'checkmark' : 'remove'}
              onClick={(e) => {
                e.preventDefault();
                formChange({ name: 'enabled', value: !formData.enabled });
              }}
            />
          </Form.Field>
        </Form.Group>
        <Advanced>
          <p>Optionaly set Block Explorer URL prefixes:</p>
          <Form.Group widths="equal">
            <FormField
              placeholder="e.g. `https://etherscan.io/address/`"
              label="Address Prefix"
              name="explorerAddressPrefix"
              {...{ formChange, formData }}
            />
            <FormField
              placeholder="e.g. `https://etherscan.io/block/`"
              label="Block Prefix"
              name="explorerBlockPrefix"
              {...{ formChange, formData }}
            />
            <FormField
              placeholder="e.g. `https://etherscan.io/tx/`"
              label="Transaction Prefix"
              name="explorerTransactionPrefix"
              {...{ formChange, formData }}
            />
          </Form.Group>
        </Advanced>
      </Form.Field>
    );
  }
}
