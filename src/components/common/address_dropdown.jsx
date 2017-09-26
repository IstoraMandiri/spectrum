import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import { getAddresses } from '~/selectors';

class AddressDropdown extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: null,
  }
  render() {
    let match;
    const { addresses, value, onChange } = this.props;
    const options = addresses.map(({ name, address }) => {
      if (address === value) { match = value; }
      return {
        key: address,
        value: address,
        text: name,
        content: <div>{name}</div>,
      };
    });
    return (
      <Dropdown
        value={match}
        placeholder="Select Address"
        floating
        search
        tabIndex="-1"
        selection
        {...{ onChange, options }}
      />
    );
  }
}

export default connect(state => ({
  addresses: getAddresses(state),
}))(AddressDropdown);
