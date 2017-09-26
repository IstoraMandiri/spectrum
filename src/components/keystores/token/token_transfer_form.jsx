import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import AddressInput from '~/components/common/address_input';
import ValueInput from '~/components/common/value_input';

export default class TokenTransferForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired,
  }
  render() {
    const { formChange, formData, contract, token } = this.props;
    const balance = contract.balanceOf(formData.from);
    const sendAll = balance && balance.shift(-token.decimals);
    const symbol = token.symbol;
    return (
      <Form.Field>
        <AddressInput placeholder="e.g. `0x123...456`" label="From" name="from" {...{ formChange, formData }} />
        <AddressInput showQrScanner placeholder="e.g. `0x123...456`" label="To" name="to" {...{ formChange, formData }} />
        <ValueInput
          color={token.color}
          label="Number of Tokens"
          name="tokenValue"
          {...{ symbol, sendAll, formChange, formData }}
        />
      </Form.Field>
    );
  }
}
