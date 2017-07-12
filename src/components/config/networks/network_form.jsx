import React, { PropTypes, Component } from 'react';
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
            placeholder="e.g. `[#96]Ethereum`"
            label="[#93]Name"
            name="name"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="e.g. `[#97]ETH`"
            label="[#94]Symbol"
            name="symbol"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="[#98]e.g. `Main Chain`"
            label="[#95]Description"
            name="description"
            {...{ formChange, formData }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField
            placeholder="[#102]e.g. `https://mainnet.infura.io`"
            label="[#99]Provider"
            name="provider"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="[#103]e.g. `1`"
            label="[#100]Chain ID (EIP 155)"
            name="chainId"
            type="number"
            {...{ formChange, formData }}
          />
          <FormField
            placeholder="[#104]e.g. `eth-mainnet`"
            label="[#101]Unique Identifier"
            name="id"
            readOnly={!!data}
            disabled={!!data}
            {...{ formChange, formData }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <ColorPicker {...{ formData, formChange }} />
          <Form.Field>
            <label htmlFor="enabled">[#105]Enabled Status</label>
            <Button
              fluid
              positive={formData.enabled}
              content={formData.enabled ? '[#107]Enabled' : '[#106]Disabled'}
              icon={formData.enabled ? 'checkmark' : 'remove'}
              onClick={(e) => {
                e.preventDefault();
                formChange({ name: 'enabled', value: !formData.enabled });
              }}
            />
          </Form.Field>
        </Form.Group>
        <Advanced>
          <p>[#109]Optionaly set Block Explorer URL prefixes:</p>
          <Form.Group widths="equal">
            <FormField
              placeholder="[#113]e.g. `https://etherscan.io/address/`"
              label="[#110]Address Prefix"
              name="explorerAddressPrefix"
              {...{ formChange, formData }}
            />
            <FormField
              placeholder="[#114]e.g. `https://etherscan.io/block/`"
              label="[#111]Block Prefix"
              name="explorerBlockPrefix"
              {...{ formChange, formData }}
            />
            <FormField
              placeholder="[#115]e.g. `https://etherscan.io/tx/`"
              label="[#112]Transaction Prefix"
              name="explorerTransactionPrefix"
              {...{ formChange, formData }}
            />
          </Form.Group>
        </Advanced>
      </Form.Field>
    );
  }
}
