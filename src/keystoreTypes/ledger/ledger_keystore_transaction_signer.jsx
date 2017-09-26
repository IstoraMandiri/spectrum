import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import LedgerContianer from '@digix/react-ledger-container';

export default class V3KestoreTransactionSigner extends Component {
  constructor(props) {
    super(props);
    this.handleSign = this.handleSign.bind(this);
  }
  handleSign({ signTransaction }) {
    const { txData, address, hideTxSigningModal } = this.props;
    const { kdPath } = address;
    signTransaction(kdPath, txData).then((signedTx) => {
      hideTxSigningModal({ signedTx });
    });
  }
  render() {
    const { kdPath, address } = this.props.address;
    return (
      <LedgerContianer
        expect={{ kdPath, address }}
        onReady={this.handleSign}
        renderReady={({ config }) => (
          <Message
            icon={config.eip155 ? 'checkmark' : 'warning'}
            positive={config.eip155}
            warning={!config.eip155}
            header={'Ready to Sign Transaction'}
            content={`Firmware ${config.version} - replay protection ${config.eip155 ? 'en' : 'dis'}abled!`}
          />
        )}
      />
    );
  }
}

V3KestoreTransactionSigner.propTypes = {
  hideTxSigningModal: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  txData: PropTypes.object.isRequired,
};
