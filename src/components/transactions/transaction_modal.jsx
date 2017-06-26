import React, { PropTypes, Component } from 'react';
import EZModal from 'sui-react-ezmodal';
import { connect } from 'react-redux';

import Web3Connect from '~/helpers/web3/connect';
import { getNetworks } from '~/selectors';
import DropdownSelector from '~/components/common/dropdown_selector';

import TransactionTracker from './transaction_tracker';
import TransactionModalForm from './transaction_modal_form';

const defaultState = { error: false, loading: false, txHash: false, network: null };

class TransactionModal extends Component {
  static propTypes = {
    handleTransaction: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    trigger: PropTypes.object.isRequired,
    web3Redux: PropTypes.object.isRequired,
    onMined: PropTypes.func,
    onBroadcast: PropTypes.func,
    renderConfirmation: PropTypes.func,
    onClose: PropTypes.func,
    network: PropTypes.object,
    header: PropTypes.string,
    size: PropTypes.string,
    web3: PropTypes.object,
    submitButtonText: PropTypes.func,
    form: PropTypes.func,
    networks: PropTypes.array,
    renderForm: PropTypes.func,
    formChange: PropTypes.func,
  }
  static defaultProps = {
    onMined: undefined,
    onBroadcast: undefined,
    renderConfirmation: undefined,
    onClose: undefined,
    network: undefined,
    header: undefined,
    size: undefined,
    web3: undefined,
    submitButtonText: undefined,
    form: undefined,
    networks: undefined,
    renderForm: undefined,
    formChange: undefined,
  }
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  getWeb3() {
    return this.props.web3 || (this.props.web3Redux.networks[(this.state.network || {}).id] || {}).web3;
  }
  handleClose() {
    if (this.props.onClose) { this.props.onClose(this.state); }
    this.setState(defaultState);
  }
  handleSubmit(formData) {
    const { handleTransaction, onMined, onBroadcast } = this.props;
    const web3 = this.getWeb3();
    this.setState({ loading: true, error: false, txHash: null });
    new Promise(resolve => setTimeout(resolve, 10)) // time for UI update
    .then(() => handleTransaction(formData, web3))
    .then((txHash) => {
      this.setState({ txHash, loading: false, broadcast: new Date() });
      if (onBroadcast) { onBroadcast({ formData, txHash }); }
      return web3.eth.waitForMined(txHash);
    })
    .then(txData => onMined && onMined({ formData, txData }, web3))
    .catch(error => this.setState({ error, loading: false }));
    return false; // don't close on submit
  }
  renderTracker() {
    const { renderConfirmation } = this.props;
    const { txHash, broadcast } = this.state;
    const network = this.props.network || this.state.network;
    return <TransactionTracker {...{ broadcast, txHash, web3: this.getWeb3(), network, renderConfirmation }} />;
  }
  renderForm(props) {
    return <TransactionModalForm {...this.props} {...props} web3={this.getWeb3()} />;
  }
  renderNetworksSelector() {
    const { networks, formChange } = this.props;
    if ((networks || []).length === 0) { return <p>No Networks Available</p>; }
    return (
      <DropdownSelector
        defaultText="Select Network"
        items={networks.filter(n => n.enabled)}
        onChange={(network) => {
          this.setState({ network });
          if (formChange) { formChange({ target: { name: 'networks', value: [network.id] } }); }
        }}
      />
    );
  }
  render() {
    // controlled EZModal where you optionally pass a form, automatically shows txTracker
    const { data, header, trigger, size, handleTransaction, submitButtonText, renderForm, form } = this.props;
    const web3 = this.getWeb3();
    if (!web3) {
      return this.renderNetworksSelector();
    }
    if (!web3 || !web3.isConnected()) {
      return null;
    }
    const { loading, txHash, network, error } = this.state;
    const autoSubmit = !renderForm && !form;
    if (!error && autoSubmit && !txHash) {
      return <span tabIndex={0} role="button" onClick={() => this.handleSubmit(data)}>{trigger}</span>;
    }
    // TODO globally configurable gas price
    return (
      <EZModal
        {...{ data: { ...data, gasPrice: data.gasPrice || 20e9 }, header, trigger, submitButtonText }}
        initiallyOpen={!!network || (autoSubmit && (txHash || error))}
        size={(txHash && 'small') || size || undefined}
        loading={loading}
        error={error}
        onClose={this.handleClose}
        noSubmitButton={!!txHash}
        closeButtonText={!txHash ? 'Cancel' : 'Done'}
        handleSubmit={handleTransaction && this.handleSubmit}
        content={(props) => {
          if (!web3) { return null; }
          if (txHash) { return this.renderTracker(); }
          return this.renderForm(props);
        }}
      />
    );
  }
}

export default Web3Connect(connect(s => ({ networks: getNetworks(s) }))(TransactionModal));
