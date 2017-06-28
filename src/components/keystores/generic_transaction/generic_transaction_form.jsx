import React, { PropTypes, Component } from 'react';

import { Form, Divider, Label, Input } from 'semantic-ui-react';

import { parseBigNumber } from '~/helpers/stringUtils';

import QrButton from '~/components/common/qr_button';
import AddressInput from '~/components/common/address_input';
import FormField from '~/components/common/form_field';
import NetworkSelector from '~/components/common/network_selector';

const txProps = {
  to: true,
  from: true,
  data: true,
  nonce: { type: 'hex' },
  gas: { type: 'hex' },
  gasPrice: { type: 'hex' },
  value: { type: 'hex', map: 'ethValue', decimals: 18 },
  chainId: true,
};

export default class GenericTransactionForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { jsonInput: '', parseError: false };
    this.handleParseData = this.handleParseData.bind(this);
  }
  handleParseData(target, { value: jsonInput }) {
    this.setState({ jsonInput, parseError: false });
    try {
      let txData = JSON.parse(jsonInput);
      if (!txData.to) { txData = JSON.parse(txData); }
      if (!txData.to) { throw new Error('Failed to Parse'); }
      const parsedTxData = Object.keys(txProps).reduce((o, k) => {
        if (!txProps[k]) { return o; }
        return {
          ...o,
          [txProps[k].map || k]: txProps[k].type === 'hex' ? parseBigNumber(txData[k], txProps[k].decimals, false) : txData[k],
        };
      }, this.props.formData);
      this.props.setFormData(parsedTxData);
    } catch (e) {
      this.setState({ parseError: true });
    }
  }
  render() {
    const { formChange, formData } = this.props;
    return (
      <div>
        <Input
          fluid
          action
          placeholder="Optional - paste JSON data"
          onChange={this.handleParseData}
          value={this.state.jsonInput}
          size="large"
        >
          <input />
          <QrButton icon="qrcode" onScan={value => this.handleAddressChange(null, { value })} />
        </Input>
        <Divider horizontal>Or Enter Manually</Divider>
        {this.state.parseError && <Label pointing danger content="Couldn't read! :(" />}
        <AddressInput placeholder="e.g. `0x123...456`" label="From" name="from" {...{ formChange, formData }} />
        <AddressInput placeholder="e.g. `0x123...456`" label="To" name="to" {...{ formChange, formData }} />
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `1000000000`" label="Value (ETH)" name="ethValue" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `0x00`" label="Data" name="data" {...{ formChange, formData }} />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `21000`" type="number" label="Gas" name="gas" {...{ formChange, formData }} />
          <FormField
            placeholder="e.g. `4000000000`"
            type="number"
            label="Gas Price"
            name="gasPrice"
            {...{ formChange, formData }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `0`" type="number" label="Nonce" name="nonce" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `1`" type="number" label="Chain ID" name="chainId" {...{ formChange, formData }} />
        </Form.Group>
        <NetworkSelector {...{ formChange }} />
      </div>
    );
  }
}
