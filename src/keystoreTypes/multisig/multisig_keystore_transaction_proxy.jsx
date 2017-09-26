import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import { getKeystoreComponent } from '~/keystoreTypes';

export default class MultisigKeystoreTransactionProxy extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    addresses: PropTypes.array.isRequired,
    txData: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedAccount: null };
  }
  componentDidMount() {
    this.props.contract.getOwners.call().then(() => {
      const availableAccounts = this.getAvailableAccounts();
      this.setAccount(availableAccounts.length > 0 && availableAccounts[0]);
    });
  }
  setAccount(selectedAccount) {
    return this.props.web3.eth.getTransactionCount(selectedAccount.address)
      .then((nonce) => {
        this.setState({ loading: false, selectedAccount, nonce });
      });
  }
  getAvailableAccounts() {
    const owners = this.props.contract.getOwners() || [];
    return this.props.addresses.filter(a => owners.indexOf(a.address.toLowerCase()) > -1);
  }
  renderAccountSelector() {
    const options = this.getAvailableAccounts().map(account => ({
      key: account.address,
      value: account,
      text: account.name,
      content: <div>{account.name}</div>,
    }));
    return (
      <Form.Field>
        <p>Select Multisig Owner Account: </p>
        <Dropdown
          fluid
          floating
          search
          selection
          placeholder="Select Address"
          tabIndex="-1"
          options={options}
          onChange={(e, { value: selectedAccount }) => this.setAccount(selectedAccount)}
        />
      </Form.Field>
    );
  }
  renderSigningUI(account) {
    // get the singing component, hook up the trigger
    const Comp = getKeystoreComponent({ id: account.keystore.type.id, type: 'transactionSigner' });
    if (!Comp) { return <p>Transaction singing UI not available</p>; }
    const { selectedAccount: address } = this.state;
    const { txData: { to, value, data }, contract } = this.props;
    if (!address) { return <p>Loading...</p>; }
    // update the txData to become the method of the contract.
    const txData = {
      ...this.props.txData,
      to: contract.address,
      from: account.address,
      nonce: this.state.nonce,
      data: contract.submitTransaction.getData(to, value, data),
      value: 0,
    };
    return <Comp {...this.props} {...{ address, txData }} />;
  }
  render() {
    const { loading, selectedAccount } = this.state;
    if (loading) { return <p>Loading...</p>; }
    const availableAccounts = this.getAvailableAccounts();
    if (availableAccounts.length === 0) { return <p>No accounts available to sign with Multisig</p>; }
    return (
      <Form>
        {this.renderAccountSelector()}
        {selectedAccount && this.renderSigningUI(selectedAccount)}
      </Form>
    );
  }
}
