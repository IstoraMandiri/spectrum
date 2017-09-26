import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TxVisualisation from '~/components/common/tx_visualisation';

import { parseBigNumber } from '~/helpers/stringUtils';

export default class BaseTokenTx extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    txData: PropTypes.object.isRequired,
  }
  render() {
    const { address, network, txData } = this.props;
    return (
      <TxVisualisation
        items={[{
          color: address.keystore.type.color,
          icon: address.keystore.type.icon,
          header: 'Sender',
          subheader: address.name,
          data: address.address,
          dataLink: `${network.explorerAddressPrefix}${address.address}`,
        }, {
          color: network.color,
          icon: 'long right arrow',
          header: `${parseBigNumber(txData.value, 18, false)} ${network.symbol}`,
          subheader: `${network.name} Ether`,
          data: network.description,
        }, {
          color: address.color,
          icon: 'user',
          header: 'Receiver',
          subheader: 'Account',
          data: txData.to,
          dataLink: `${network.explorerAddressPrefix}${txData.to}`,
        }]}
      />
    );
  }
}
