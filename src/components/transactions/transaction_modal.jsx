import React, { PropTypes, Component } from 'react';

import TransactionTracker from './transaction_tracker';
import TransactionModalForm from './transaction_modal_form';
import TransactionModalContainer from './transaction_modal_container';

const defaultState = { open: false, error: false, loading: false, txHash: false, formData: null, networkId: null };

export default class TransactionModal extends Component {
  static propTypes = {
    handleTransaction: PropTypes.func.isRequired,
    data: PropTypes.object,
    trigger: PropTypes.object.isRequired,
    onMined: PropTypes.func,
    onBroadcast: PropTypes.func,
    renderConfirmation: PropTypes.func,
    onClose: PropTypes.func,
    size: PropTypes.string,
    network: PropTypes.object,
  }
  static defaultProps = {
    onMined: undefined,
    onBroadcast: undefined,
    renderConfirmation: undefined,
    onClose: undefined,
    size: undefined,
    network: undefined,
    data: {},
  }
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMined = this.handleMined.bind(this);
  }
  handleClose() {
    if (this.props.onClose) { this.props.onClose(this.state); }
    this.setState(defaultState);
  }
  handleMined(txData, web3) {
    const { onMined } = this.props;
    if (onMined) {
      const { formData } = this.state;
      onMined({ txData, formData }, web3);
    }
  }
  handleSubmit(formData, web3) {
    // set the networkId
    const { handleTransaction, onBroadcast } = this.props;
    if (!web3 && !formData.networkId) {
      throw new Error('Network ID not set');
    }
    // ensure the set networkId is correct
    if (web3 && formData.networkId && web3.networkId !== formData.networkId) {
      throw new Error('Network ID mismatch');
    }
    // set the network ID, in case web3 was not passed
    this.setState({ loading: true, error: false, txHash: null });
    // only pass the nonce if it's an integer
    const { nonce, ...sanitizedData } = formData;
    if (Number.isInteger(parseInt(nonce, 10))) {
      sanitizedData.nonce = nonce;
    }
    new Promise(resolve => setTimeout(resolve, 10)) // time for UI update
    .then(() => handleTransaction(sanitizedData, web3))
    .then((txHash) => {
      if (!txHash) { throw Error('Transaction was not published!'); }
      this.setState({ formData, networkId: web3.networkId, txHash, loading: false, broadcast: new Date() });
      if (onBroadcast) { onBroadcast({ formData, txHash }); }
    })
    .catch(error => this.setState({ error, loading: false }));
    return false; // don't close on submit
  }
  renderTracker() {
    const { renderConfirmation } = this.props;
    const { txHash, networkId, broadcast } = this.state;
    const { handleMined: onMined } = this;
    return <TransactionTracker {...{ broadcast, txHash, onMined, networkId, renderConfirmation }} />;
  }
  renderForm(props) {
    return <TransactionModalForm {...this.props} {...props} />;
  }
  render() {
    const { data, trigger, size, network } = this.props;
    const { txHash, open } = this.state;
    const networkId = data.networkId || (network && network.id) || undefined;
    if (!open) {
      return <span tabIndex={0} role="button" onClick={() => this.setState({ open: true })}>{trigger}</span>;
    }
    // once modal is open, pass a Web3Connected container, which passes web3 to the event handlers
    return (
      <TransactionModalContainer
        {...{
          ...this.props,
          ...this.state,
          data: { ...data, gasPrice: data.gasPrice || 20e9, networkId },
          size: (txHash && 'small') || size || undefined,
          onClose: this.handleClose,
          handleSubmit: this.handleSubmit,
          closeButtonText: !txHash ? '[#16]Cancel' : 'Done',
          noSubmitButton: !!txHash,
          content: (props) => {
            if (txHash) { return this.renderTracker(props); }
            return this.renderForm(props);
          },
        }}
      />
    );
  }
}
