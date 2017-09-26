import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionModal from '~/components/transactions/transaction_modal';

import { toBigNumber } from '~/helpers/stringUtils';

import TokenTransactionForm from './token_transfer_form';

export default class TokenTransfer extends Component {
  static propTypes = {
    data: PropTypes.object,
    trigger: PropTypes.node.isRequired,
    contract: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    data: undefined,
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTransaction = this.handleTransaction.bind(this);
    this.handleMined = this.handleMined.bind(this);
  }
  handleTransaction({ tokenValue, to, ...rest }) {
    const { contract, token } = this.props;
    if (!tokenValue) { throw new Error('You must enter a value'); }
    if (!rest.from) { throw new Error('You must select a sender'); }
    if (!to) { throw new Error('You must select a receipient'); }
    const value = toBigNumber(tokenValue).shift(token.decimals);
    return contract.transfer.sendTransaction(to, value, { ...rest, ui: { type: 'tokenTx', token, value, to } });
  }
  handleMined({ formData }) {
    const { contract } = this.props;
    contract.balanceOf.call(formData.to);
    contract.balanceOf.call(formData.from);
  }
  render() {
    const { data, trigger, token, contract } = this.props;
    const { network } = token;
    return (
      <TransactionModal
        header={`Send ${token.name} Tokens`}
        handleTransaction={this.handleTransaction}
        onMined={this.handleMined}
        form={TokenTransactionForm}
        {...{ data, trigger, network, token, contract }}
      />
    );
  }
}
