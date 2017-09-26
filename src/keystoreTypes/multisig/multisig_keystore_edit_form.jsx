import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultSigKeystoreCreationForm from './multisig_keystore_creation_form';

export default class MultSigKeystoreEditForm extends Component {
  componentDidMount() {
    const formData = this.props.data.addresses[0];
    this.props.setFormData({
      type: this.props.data.type,
      address: formData.address,
      name: formData.name,
      tokens: formData.tokens.map(({ id }) => id),
      networks: formData.networks.map(({ id }) => id),
    });
  }
  render() {
    return (
      <MultSigKeystoreCreationForm {...this.props} editing />
    );
  }
}

MultSigKeystoreEditForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
