import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LedgerKeystoreCreationForm from './ledger_keystore_creation_form';

export default class LedgerKeystoreEditForm extends Component {
  static propTypes = {
    setFormData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.setFormData({
      type: this.props.data.type,
      addresses: this.props.data.addresses.reduce((o, a) => ({
        ...o,
        [a.kdPath]: {
          name: a.name,
          kdPath: a.kdPath,
          enabled: true,
          address: a.address, // TODO ensure we don't override other addresses
          tokens: a.tokens.map(({ id }) => id),
          networks: a.networks.map(({ id }) => id),
        },
      }), {}),
    });
  }
  render() {
    const { formChange, formData } = this.props;
    if (!formData.addresses) { return null; }
    return (
      <LedgerKeystoreCreationForm {...{ formChange, formData }} />
    );
  }
}
