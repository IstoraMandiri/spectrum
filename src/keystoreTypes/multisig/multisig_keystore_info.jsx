import React, { PropTypes, Component } from 'react';
import EZModal from 'sui-react-ezmodal';
import { Button } from 'semantic-ui-react';

import MultiSig from '@digix/truffle-gnosis-multisig/spectrum/index.jsx';

export default class MultisigKeystoreInfo extends Component {
  render() {
    const { formData } = this.props;
    const { networks, address } = formData;
    const networkId = (networks || [])[0];
    if (!networkId || !address) { return null; }
    return (
      <EZModal
        header="Manage Wallet"
        size="fullscreen"
        content={<MultiSig {...{ address, networkId }} />}
        trigger={<Button content="Wallet Info" icon="info" color="blue" onClick={e => e.preventDefault()} />}
      />
    );
  }
}

MultisigKeystoreInfo.propTypes = {
  formData: PropTypes.object.isRequired,
};
