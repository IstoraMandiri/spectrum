import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { abi } from '@digix/truffle-gnosis-multisig/build/contracts/MultiSig.json';

import Web3Connect from '~/helpers/web3/connect';
import { getAddresses, getDefaultAddress } from '~/selectors';

import MultisigKeystoreTrasnactionProxy from './multisig_keystore_transaction_proxy';

class MultisigKeystoreTransactionSigner extends Component {
  static propTypes = {
    txData: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    web3Redux: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { stage: 1 };
  }
  render() {
    const { web3 } = (this.props.web3Redux.networks || {})[(this.props.network || {}).id] || {};
    if (!web3 || !web3.isConnected()) { return <p>Network not connected</p>; }
    const contract = web3.eth.contract(abi).at(this.props.txData.from);
    const txData = {
      ...this.props.txData,
      gas: 4000000,
    };
    return <MultisigKeystoreTrasnactionProxy {...this.props} txData={txData} contract={contract} web3={web3} />;
  }
}

function mapStatetoProps(state) {
  return {
    addresses: getAddresses(state),
    defaultAddress: getDefaultAddress(state),
  };
}
// get the keystore data etc.
export default Web3Connect(connect(mapStatetoProps)(MultisigKeystoreTransactionSigner));
