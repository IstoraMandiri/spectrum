import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { getKeystoreComponent } from '~/keystoreTypes';

import KeystoreTypeMessage from './keystore_type_message';

export default class KeystoreEditForm extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }
  render() {
    const keystore = this.props.data;
    const KeystoreTypeEditForm = getKeystoreComponent({ type: 'editForm', id: keystore.type.id });
    return (
      <Form.Field>
        <KeystoreTypeMessage keystoreType={keystore.type} />
        <KeystoreTypeEditForm {...this.props} />
      </Form.Field>
    );
  }
}
