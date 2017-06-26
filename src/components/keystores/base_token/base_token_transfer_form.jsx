import React, { PropTypes, Component } from 'react';
import { Form } from 'semantic-ui-react';

import { toBigNumber } from '~/helpers/stringUtils';

import AddressInput from '~/components/common/address_input';
import ValueInput from '~/components/common/value_input';

export default class BaseTokenTransferForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
  };
  render() {
    const { formChange, formData, web3, network, network: { symbol } } = this.props;
    const { gas, gasPrice, from } = formData;
    const sendAll = gas && gasPrice && web3.eth.balance(from).minus(toBigNumber(gas).mul(gasPrice)).shift(-18);
    // calculate gas
    return (
      <Form.Field>
        <AddressInput placeholder="e.g. `0x123...456`" label="From" name="from" {...{ formChange, formData }} />
        <AddressInput showQrScanner placeholder="e.g. `0x123...456`" label="To" name="to" {...{ formChange, formData }} />
        <ValueInput
          color={network.color}
          label="Value"
          name="ethValue"
          {...{ symbol, sendAll, formChange, formData }}
        />
      </Form.Field>
    );
  }
}
