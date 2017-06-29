import React, { PropTypes, Component } from 'react';
import EZModal from 'sui-react-ezmodal';

import Web3Connect from '~/helpers/web3/connect';

import TransactionTracker from './transaction_tracker';
import TransactionModalForm from './transaction_modal_form';

const defaultState = { error: false, loading: false, txHash: false, networkId: null };

class TransactionModal extends Component {
  static propTypes = {
    handleTransaction: PropTypes.func.isRequired,
    data: PropTypes.object,
    trigger: PropTypes.object.isRequired,
    web3Redux: PropTypes.object.isRequired,
    onMined: PropTypes.func,
    onBroadcast: PropTypes.func,
    renderConfirmation: PropTypes.func,
    onClose: PropTypes.func,
    header: PropTypes.string,
    size: PropTypes.string,
    web3: PropTypes.object,
    submitButtonText: PropTypes.func,
    form: PropTypes.func,
    networks: PropTypes.array,
    renderForm: PropTypes.func,
  }
  static defaultProps = {
    onMined: undefined,
    onBroadcast: undefined,
    renderConfirmation: undefined,
    onClose: undefined,
    header: undefined,
    size: undefined,
    web3: undefined,
    submitButtonText: undefined,
    form: undefined,
    networks: undefined,
    renderForm: undefined,
    data: {},
  }
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMined = this.handleMined.bind(this);
    this.getWeb3 = this.getWeb3.bind(this);
  }
  getWeb3() {
    // if web3 is not set, use the networkId passed from formData
    return this.props.web3 || (this.props.web3Redux.networks[this.state.networkId] || {}).web3;
  }
  handleClose() {
    if (this.props.onClose) { this.props.onClose(this.state); }
    this.setState(defaultState);
  }
  handleMined() {
    const { onMined } = this.props;
    if (onMined) {
      const { formData, txData } = this.state;
      const web3 = this.getWeb3();
      onMined({ formData, txData }, web3);
    }
  }
  handleSubmit(formData) {
    // set the networkId
    const { handleTransaction, onBroadcast } = this.props;
    const { networkId } = formData;
    if (!this.props.web3 && !networkId) {
      throw new Error('Network ID not set');
    }
    if (this.props.web3 && formData.networkId && this.props.web3.networkId !== formData.networkId) {
      throw new Error('Network ID mismatch');
    }
    // set the network ID, in case web3 was not passed
    this.setState({ loading: true, error: false, txHash: null, networkId: formData.networkId });
    // only pass the nonce if it's an integer
    const { nonce, ...sanitizedData } = formData;
    if (Number.isInteger(parseInt(nonce, 10))) {
      sanitizedData.nonce = nonce;
    }
    new Promise(resolve => setTimeout(resolve, 10)) // time for UI update
    .then(() => handleTransaction(sanitizedData, this.getWeb3()))
    .then((txHash) => {
      if (!txHash) { throw Error('Transaction was not published!'); }
      this.setState({ formData, txHash, loading: false, broadcast: new Date() });
      if (onBroadcast) { onBroadcast({ formData, txHash }); }
    })
    .catch(error => this.setState({ error, loading: false }));
    return false; // don't close on submit
  }
  renderTracker() {
    const { renderConfirmation } = this.props;
    const { txHash, broadcast } = this.state;
    const { handleMined: onMined, getWeb3 } = this;
    const { networkId } = getWeb3();
    return <TransactionTracker {...{ broadcast, txHash, onMined, networkId, renderConfirmation }} />;
  }
  renderForm(props) {
    return <TransactionModalForm {...this.props} {...props} web3={this.getWeb3()} />;
  }
  render() {
    const { data, header, trigger, size, handleTransaction, submitButtonText, renderForm, form } = this.props;
    const { loading, txHash, error } = this.state;
    const autoSubmit = !renderForm && !form;
    if (!error && autoSubmit && !txHash) {
      return <span tabIndex={0} role="button" onClick={() => this.handleSubmit(data)}>{trigger}</span>;
    }
    return (
      <EZModal
        {...{ data: { ...data, gasPrice: data.gasPrice || 20e9 }, header, trigger, submitButtonText }}
        initiallyOpen={autoSubmit && (txHash || error)}
        size={(txHash && 'small') || size || undefined}
        loading={loading}
        error={error}
        onClose={this.handleClose}
        noSubmitButton={!!txHash}
        closeButtonText={!txHash ? 'Cancel' : 'Done'}
        handleSubmit={handleTransaction && this.handleSubmit}
        content={(props) => {
          if (txHash) { return this.renderTracker(); }
          return this.renderForm(props);
        }}
      />
    );
  }
}

export default Web3Connect(TransactionModal);
