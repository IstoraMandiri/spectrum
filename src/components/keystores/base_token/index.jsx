import React, { PropTypes, Component } from 'react';

import { registerUIs } from '~/helpers/uiRegistry';

import BaseTokenBalance from './base_token_balance';
import BaseTokenTransfer from './base_token_transfer';
import BaseTokenTxUi from './base_token_tx_ui';

// register the tx ui
registerUIs({ baseTokenTx: { component: BaseTokenTxUi } });

export default class BaseTokenButton extends Component {
  static propTypes = {
    web3Redux: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
  };
  render() {
    const { network, web3Redux, address } = this.props;
    if (!network || !network.enabled) { return null; }
    if (!address || !address.address) { return null; }
    const web3 = web3Redux.web3(network.id);
    if (!web3) { return null; }
    const gas = 21000;
    return (
      <BaseTokenTransfer
        trigger={<span className="padded"><BaseTokenBalance {...{ network, web3, address }} /></span>}
        data={{ from: address.address, gas }}
        {...{ network, web3 }}
      />
    );
  }
}
