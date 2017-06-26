import React, { PropTypes, Component } from 'react';

import { ERC20_ABI } from '~/helpers/constants';
import { registerUIs } from '~/helpers/uiRegistry';

import TokenBalance from './token_balance';
import TokenTransfer from './token_transfer';
import TokenTx from './token_tx';

// register the tx ui
registerUIs({ tokenTx: { component: TokenTx } });

export default class BaseTokenButton extends Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    web3Redux: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
  }
  render() {
    const { token, web3Redux, address } = this.props;
    const { network } = token;
    if (!token || !token.networkEnabled) { return null; } // enabled for account
    if (!network || !network.enabled) { return null; } // enabled globally
    if (!address || !address.address) { return null; } // sanity check
    const { web3 } = web3Redux.networks[network.id] || {};
    if (!web3) { return null; }
    const contract = web3.eth.contract(ERC20_ABI).at(token.address);
    // TODO get the token-specific gas price
    return (
      <TokenTransfer
        trigger={<span className="padded"><TokenBalance {...{ contract, token, web3, address }} /></span>}
        data={{ from: address.address, gas: 4000000 }}
        {...{ contract, web3, network, token }}
      />
    );
  }
}
