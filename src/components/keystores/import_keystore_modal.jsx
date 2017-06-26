import React, { PropTypes, Component } from 'react';
import EZModal from 'sui-react-ezmodal';

import ImportKeystoreForm from './import_keystore_form';
import KeystoreModal from './keystore_modal';
import KeystoreCreationForm from './keystore_creation_form';

export default class ImportKeystore extends Component {
  static propTypes = {
    trigger: PropTypes.node.isRequired,
    createKeystore: PropTypes.func.isRequired,
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
    this.setState({ privateKey: false });
  }
  renderUnlocked() {
    const { privateKey, password, name } = this.state;
    return (
      <KeystoreModal
        initiallyOpen
        hideMenu
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
