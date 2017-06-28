import React, { PropTypes, Component } from 'react';
import TransactionModal from '~/components/transactions/transaction_modal';

import { toBigNumber } from '~/helpers/stringUtils';

import TokenTransactionForm from './token_transfer_form';

export default class TokenTransfer extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
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
  handleTransaction({ to, from, gas, gasPrice, tokenValue }) {
    const { contract, token } = this.props;
    if (!tokenValue) { throw new Error('You must enter a value'); }
    const value = toBigNumber(tokenValue).shift(token.decimals);
    return contract.transfer.sendTransaction(to, value, { gas, gasPrice, from, ui: { type: 'tokenTx', token, value, to } });
  }
  handleMined({ formData }) {
    const { contract } = this.props;
    contract.balanceOf.call(formData.to);
    contract.balanceOf.call(formData.from);
  }
  render() {
    const { data, web3, trigger, token, contract } = this.props;
    return (
      <TransactionModal
        header={`Send ${token.name} Tokens`}
        handleTransaction={this.handleTransaction}
        onMined={this.handleMined}
        form={TokenTransactionForm}
        {...{ data, trigger, web3, token, contract }}
      />
    );
  }
}
