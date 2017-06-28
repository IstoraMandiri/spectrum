import React, { PropTypes, Component } from 'react';
import { toBigNumber } from '~/helpers/stringUtils';
import TransactionModal from '~/components/transactions/transaction_modal';

import BaseTokenTransferForm from './base_token_transfer_form';

export default class BaseTokenTransfer extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
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
  handleTransaction({ ethValue, ...rest }) {
    const { web3 } = this.props;
    if (!ethValue) { throw new Error('You must enter a value'); }
    const value = toBigNumber(ethValue).shift(18);
    return web3.eth.sendTransaction({ ...rest, value, ui: { type: 'baseTokenTx' } });
  }
  handleMined({ formData }) {
    const { web3 } = this.props;
    web3.eth.getBalance(formData.to);
    web3.eth.getBalance(formData.from);
  }
  render() {
    const { data, web3, trigger, network } = this.props;
    return (
      <TransactionModal
        header={`Send ${network.name} Ether`}
        handleTransaction={this.handleTransaction}
        onMined={this.handleMined}
        form={BaseTokenTransferForm}
        {...{ data, trigger, web3, network }} // passed to form
      />
    );
  }
}
