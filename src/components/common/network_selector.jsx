import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { getNetworks } from '~/selectors';
import DropdownSelector from '~/components/common/dropdown_selector';

class NetworkSelector extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    formChange: PropTypes.func,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    showDisabled: PropTypes.bool,
  }
  static defaultProps = {
    name: 'networkId',
    showDisabled: false,
    formChange: undefined,
    formData: undefined,
    onChange: undefined,
  }
  render() {
    const { showDisabled, networks, onChange, formChange, formData, name } = this.props;
    let items = (networks || []);
    if (!showDisabled) { items = items.filter(n => n.enabled); }
    if (items.length === 0) { return <p>No Networks Available</p>; }
    return (
      <DropdownSelector
        defaultText="Select Network"
        items={items}
        name={name}
        formData={formData}
        onChange={(network) => {
          if (onChange) { onChange(network); }
          if (formChange) { formChange({ name, value: network.id }); }
        }}
      />
    );
  }
}

export default connect(s => ({ networks: getNetworks(s) }))(NetworkSelector);
