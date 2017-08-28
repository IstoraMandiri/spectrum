import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { createKeystore, updateKeystore, deleteKeystore } from '~/actions/keystore';

import ImportKeystoreModal from './import_keystore_modal';

import KeystoreModal from './keystore_modal';
import KeystoreCreationForm from './keystore_creation_form';

import GenericTransaction from './generic_transaction';

class KeystoreButtons extends Component {
  static propTypes = {
    createKeystore: PropTypes.func.isRequired,
    inverted: PropTypes.bool,
    keystores: PropTypes.array,
    skipImportConfirmation: PropTypes.bool,
  }
  static defaultProps = {
    size: undefined,
    keystores: [],
    inverted: false,
    skipImportConfirmation: false,
  }
  render() {
    return (
      <span>
        {!!this.props.keystores.length && <GenericTransaction /> }
        <KeystoreModal
          {...this.props}
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          trigger={
            <Button inverted={this.props.inverted} onClick={e => e.preventDefault()} basic icon="plus" content="Create" />
          }
        />
        <ImportKeystoreModal
          {...this.props}
          skipConfirmation={this.props.skipImportConfirmation}
          trigger={
            <Button inverted={this.props.inverted} onClick={e => e.preventDefault()} basic icon="upload" content="Import" />
          }
        />
      </span>

    );
  }
}

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
};

export default connect(null, actions)(KeystoreButtons);
