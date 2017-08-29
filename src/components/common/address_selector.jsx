import React, { PropTypes, Component } from 'react';
import { Label, Image, Dropdown } from 'semantic-ui-react';

import KeystoreButtons from '~/components/keystores/keystore_buttons';

import blockie from '~/helpers/blockie';

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
  renderItem({ name, address, keystore }) {
    return (
      <span>
        <Image
          src={blockie(address)}
          avatar
          style={{
            margin: '-1.3em 1em -1.2em -1em',
            height: '2.6em',
            width: '2.6em',
            borderRadius: '0',
          }}
        />
        {' '}
        <span style={{ maxWidth: '40%' }} className="truncated">
          {address.substr(0, address.length - 4)}
        </span>
        <span className="truncated">{address.substr(-4)}</span>
        {' '}-{' '}
        <span style={{ maxWidth: '20%' }} className="truncated">
          {name}
        </span>
        <Label
          color={keystore.type.color}
          content={keystore.type.name}
          style={{ float: 'right', margin: '-0.42em' }}
        />
      </span>
    );
  }
  render() {
    const { initialAddress, onChange, addresses, preText, ...rest } = this.props;
    const items = addresses.map(a => ({
      ...a,
      name: a.name,
      id: a.address,
      // color: a.keystore.type.color,
    }));
    const initiallySelected = items.find(a => a.address === initialAddress);
    return (
      <DropdownSelector
        props={rest}
        onChange={onChange}
        items={items}
        preText={preText}
        initiallySelected={initiallySelected}
        renderTrigger={({ selectedItem }) => (
          this.renderItem(selectedItem)
        )}
        renderItem={({ item, props: { onClick } }) => (
          <Dropdown.Item onClick={onClick}>
            {this.renderItem(item)}
          </Dropdown.Item>
        )}
        renderBottom={() => (
          <Dropdown.Item className="non-selectable">
            New Address: <KeystoreButtons skipImportConfirmation />
          </Dropdown.Item>
        )}
      />
    );
  }
}
