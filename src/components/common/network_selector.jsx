import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { getNetworks } from '~/selectors';
import DropdownSelector from '~/components/common/dropdown_selector';

class NetworkSelector extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    formChange: PropTypes.func,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    formChange: undefined,
    onChange: undefined,
  }
  render() {
    const { networks, onChange, formChange } = this.props;
    const items = (networks || []).filter(n => n.enabled);
    if (items.length === 0) { return <p>No Networks Available</p>; }
    return (
      <DropdownSelector
        defaultText="Select Network"
        items={items}
        onChange={(network) => {
          if (onChange) { onChange(network); }
          if (formChange) { formChange({ name: 'networkId', value: network.id }); }
        }}
      />
    );
  }
}

export default connect(s => ({ networks: getNetworks(s) }))(NetworkSelector);
