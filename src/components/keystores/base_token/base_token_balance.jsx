import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BalanceLabel from '~/components/common/balance_label';

import { parseBigNumber } from '~/helpers/stringUtils';

export default class BaseTokenBalance extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { address, web3 } = this.props;
    web3.eth.getBalance(address.address);
  }
  render() {
    const { web3, network, address } = this.props;
    const balance = web3.eth.balance(address.address);
    const parsedBalance = parseBigNumber(balance, 18);
    return <BalanceLabel item={network} value={parsedBalance} />;
  }
}
