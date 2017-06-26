import React, { PropTypes, Component } from 'react';
import DropdownSelector from './dropdown_selector';

export default class AddressSelector extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    initialAddress: PropTypes.string,
    onChange: PropTypes.func,
    preText: PropTypes.string,
  }
  static defaultProps = {
    initialAddress: null,
    onChange: null,
    preText: null,
  }
  render() {
    const { initialAddress, onChange, addresses, preText, ...rest } = this.props;
    const items = addresses.map(a => ({
      ...a,
      name: `${a.address.slice(0, 6)}... ${a.name}`,
      id: a.address,
      color: a.keystore.type.color,
    }));
    const initiallySelected = items.find(a => a.address === initialAddress);
    return (
      <DropdownSelector
        props={rest}
        onChange={onChange}
        items={items}
        preText={preText}
        initiallySelected={initiallySelected}
        renderItem={this.renderItem}
        renderLable={this.renderLabel}
      />
    );
  }
}
