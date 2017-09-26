import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import QrCode from '~/components/common/qr_code';
import QrReader from '~/components/common/qr_reader';

export default class ColdKeystoreTransactionSigner extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 1 };
  }
  render() {
    const { stage } = this.state;
    const { txData, hideTxSigningModal } = this.props;
    const { to, from, data, value, nonce, gas, gasPrice, chainId } = txData;
    const dataToSend = JSON.stringify({ to, from, data, value, nonce, gas, gasPrice, chainId });
    return (
      <div>
        <Menu fluid widths={2}>
          <Menu.Item active={stage === 1} onClick={() => { this.setState({ stage: 1 }); }}>1: Sign</Menu.Item>
          <Menu.Item active={stage === 2} onClick={() => { this.setState({ stage: 2 }); }}>2: Broadcast</Menu.Item>
        </Menu>
        {stage === 1 && <QrCode data={dataToSend} />}
        {stage === 2 && <QrReader onScan={(signedTx) => { hideTxSigningModal({ signedTx }); }} />}
      </div>
    );
  }
}

ColdKeystoreTransactionSigner.propTypes = {
  hideTxSigningModal: PropTypes.func.isRequired,
  txData: PropTypes.object.isRequired,
};
