import React, { PropTypes, Component } from 'react';

import TxVisualisation from '~/components/common/tx_visualisation';

export default class MultisigKeystoreDeployTxUi extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }
  render() {
    const { address, network, ui: { required, count } } = this.props;
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
          color: 'blue',
          icon: 'upload',
          header: 'Deploy',
          subheader: 'Create new Contract',
          data: `${network.name} network`,
        }, {
          color: 'orange',
          icon: 'file text outline',
          header: 'Multisig Wallet',
          subheader: `${count} owners`,
          data: `${required} approvals required`,
        }]}
      />
    );
  }
}
