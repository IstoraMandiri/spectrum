import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { getNetworks } from '~/selectors';

import DropdownSelector from '~/components/common/dropdown_selector';

class NetworkPicker extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
    networks: PropTypes.array.isRequired,
  };
  render() {
    const { networks, formData, formChange } = this.props;
    return (
      <DropdownSelector
        defaultText="Select Network"
        name="network"
        items={networks}
        {...{ formChange, formData }}
      />
    );
  }
}

export default connect(state => ({ networks: getNetworks(state) }))(NetworkPicker);
