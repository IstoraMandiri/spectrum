import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EZModal from 'sui-react-ezmodal';

import ImportKeystoreForm from './import_keystore_form';
import KeystoreModal from './keystore_modal';
import KeystoreCreationForm from './keystore_creation_form';

export default class ImportKeystore extends Component {
  static propTypes = {
    trigger: PropTypes.node.isRequired,
    createKeystore: PropTypes.func.isRequired,
    skipConfirmation: PropTypes.bool,
  }
  static defaultProps = {
    skipConfirmation: false,
  }
  constructor(props) {
    super(props);
    this.state = { privateKey: false };
    this.handleGotPrivateKey = this.handleGotPrivateKey.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleGotPrivateKey({ privateKey, password, name }) {
    this.setState({ privateKey, password, name });
  }
  handleReset() {
    this.setState({ privateKey: false, password: null });
  }
  renderUnlocked() {
    const { privateKey, password, name } = this.state;
    return (
      <KeystoreModal
        initiallyOpen
        size={this.props.skipConfirmation ? 'small' : undefined}
        hideMenu
        skipConfirmation={this.props.skipConfirmation}
        header="Import Unlocked Keystore"
        data={{ type: 'v3', privateKey, password, confirmPassword: password, name }}
        onClose={this.handleReset}
        submitFunc={this.props.createKeystore}
        form={KeystoreCreationForm}
        trigger={this.props.trigger}
      />
    );
  }
  renderImport() {
    return (
      <EZModal
        header="Import Keystore"
        size="small"
        noSubmitButton
        trigger={this.props.trigger}
        onClose={this.handleReset}
        content={props => <ImportKeystoreForm {...props} onGetPrivateKey={this.handleGotPrivateKey} />}
      />
    );
  }
  render() {
    return !this.state.privateKey ? this.renderImport() : this.renderUnlocked();
  }
}
