import React, { PropTypes, Component } from 'react';
import { toBigNumber } from '~/helpers/stringUtils';
import TransactionModal from '~/components/transactions/transaction_modal';

import BaseTokenTransferForm from './base_token_transfer_form';

export default class BaseTokenTransfer extends Component {
  static propTypes = {
    data: PropTypes.object,
    trigger: PropTypes.node.isRequired,
    network: PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: undefined,
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTransaction = this.handleTransaction.bind(this);
    this.handleMined = this.handleMined.bind(this);
  }
  handleTransaction({ ethValue, ...rest }, web3) {
    if (!ethValue) { throw new Error('You must enter a value'); }
    const value = toBigNumber(ethValue).shift(18);
    return web3.eth.sendTransaction({ ...rest, value, ui: { type: 'baseTokenTx' } });
  }
  handleMined({ formData }, web3) {
    web3.eth.getBalance(formData.to);
    web3.eth.getBalance(formData.from);
  }
  render() {
    const { data, trigger, network } = this.props;
    return (
      <TransactionModal
        header={`Send ${network.name} Ether`}
        handleTransaction={this.handleTransaction}
        onMined={this.handleMined}
        form={BaseTokenTransferForm}
        {...{ data, trigger, network }}
      />
    );
  }
}
