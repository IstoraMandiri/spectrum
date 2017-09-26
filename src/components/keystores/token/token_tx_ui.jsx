import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TxVisualisation from '~/components/common/tx_visualisation';

import { parseBigNumber } from '~/helpers/stringUtils';

export default class BaseTokenTx extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }
  render() {
    const { address, network, ui: { token, value, to } } = this.props;
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
          color: token.color,
          icon: 'long right arrow',
          header: `${parseBigNumber(value, token.decimals, false)} ${token.symbol}`,
          subheader: `${token.name}`,
          data: token.address,
          dataLink: `${network.explorerAddressPrefix}${token.address}`,
        }, {
          color: address.color,
          icon: 'user',
          header: 'Receiver',
          subheader: 'Account',
          data: to,
          dataLink: `${network.explorerAddressPrefix}${to}`,
        }]}
      />
    );
  }
}
