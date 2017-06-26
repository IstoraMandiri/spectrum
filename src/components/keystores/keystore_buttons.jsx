import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { createKeystore, updateKeystore, deleteKeystore } from '~/actions/keystore';

import ImportKeystoreModal from './import_keystore_modal';

import KeystoreModal from './keystore_modal';
import KeystoreCreationForm from './keystore_creation_form';

class KeystoreButtons extends Component {
  static propTypes = {
    size: PropTypes.string,
    createKeystore: PropTypes.func.isRequired,
  }
  static defaultProps = {
    size: undefined,
  }
  render() {
    return (
      <span>
        <KeystoreModal
          {...this.props}
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          trigger={
            <Button onClick={e => e.preventDefault()} basic icon="plus" content="Create" size={this.props.size} />
          }
        />
        <ImportKeystoreModal
          {...this.props}
          trigger={
            <Button onClick={e => e.preventDefault()} basic icon="upload" content="Import" size={this.props.size} />
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
