import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BalanceLabel from '~/components/common/balance_label';

import { parseBigNumber } from '~/helpers/stringUtils';

export default class TokenBalance extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { contract, address } = this.props;
    contract.balanceOf.call(address.address);
  }
  render() {
    const { contract, token, address } = this.props;
    const balance = contract.balanceOf(address.address);
    const parsedBalance = parseBigNumber(balance, token.decimals);
    return <BalanceLabel item={token} value={parsedBalance || 0} />;
  }
}
