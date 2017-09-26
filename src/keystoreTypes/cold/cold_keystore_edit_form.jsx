import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ColdKeystoreCreationForm from './cold_keystore_creation_form';

export default class ColdKeystoreEditForm extends Component {
  static propTypes = {
    setFormData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.props.setFormData({
      type: this.props.data.type,
      addresses: this.props.data.addresses.reduce((o, a, i) => ({
        ...o,
        [`${i}`]: {
          name: a.name,
          enabled: true,
          exists: true,
          address: a.address,
          tokens: a.tokens.map(({ id }) => id),
          networks: a.networks.map(({ id }) => id),
        },
      }), {}),
    });
  }
  render() {
    return <ColdKeystoreCreationForm {...this.props} editing />;
  }
}
