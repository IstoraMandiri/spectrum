import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateSession } from '~/actions/session';
import { getAddresses } from '~/selectors';

import KeystoreButtons from '~/components/keystores/keystore_buttons';

import AddressSelector from './address_selector';

class DefaultAddressSelector extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    updateSession: PropTypes.func.isRequired,
    renderNoAccounts: PropTypes.func,
  };
  static defaultProps = {
    renderNoAccounts: undefined,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ address }) {
    this.props.updateSession({ defaultAddress: address });
  }
  render() {
    const { updateSession: ignoreMe, renderNoAccounts, addresses, ...rest } = this.props;
    if (!addresses.length) {
      return renderNoAccounts ? renderNoAccounts() : <span>No keystores:{' '}{' '}{' '}<KeystoreButtons skipImportConfirmation /></span>;
    }
    const initialAddress = (addresses.find(a => a.isDefault) || {}).address;
    return (
      <AddressSelector
        {...rest}
        {...{ addresses, initialAddress }}
        onChange={this.handleChange}
      />
    );
  }
}

export default connect(state => ({
  addresses: getAddresses(state),
}), { updateSession })(DefaultAddressSelector);
