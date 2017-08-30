import React, { PropTypes, Component } from 'react';
import { Table } from 'semantic-ui-react';
import LedgerContianer from '@digix/react-ledger-container';

import LedgerAddressList from './ledger_keystore_address_list';
import LedgerKeystoreAddressItem from './ledger_keystore_address_item';

export default class LedgerKeystoreCreationForm extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
  }
  handleItemChange(e) {
    const { name, value } = e;
    const addresses = (this.props.formData || {}).addresses || {};
    const update = {
      networks: (addresses[name] || {}).networks || this.props.formData.networks,
      tokens: (addresses[name] || {}).tokens || this.props.formData.tokens,
      ...value,
    };
    this.props.formChange({ name: 'addresses', value: { ...addresses, [name]: { ...addresses[name], ...update } } });
  }
  renderContainer({ renderItems }) {
    const count = Object.values(this.props.formData.addresses || {}).filter(a => a.enabled).length;
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Select addresses to enable</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" colSpan={100}>{count} enabled</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {renderItems()}
        </Table.Body>
      </Table>
    );
  }
  renderItem(item) {
    if (!item.address) {
      return (
        <Table.Row disabled key={item.kdPath}>
          <Table.Cell colSpan={100}>
            Getting Address Info...
          </Table.Cell>
        </Table.Row>
      );
    }
    const data = ((this.props.formData || {}).addresses || {})[item.kdPath] || {};
    return <LedgerKeystoreAddressItem key={item.kdPath} {...item} data={data} onChange={this.handleItemChange} />;
  }
  render() {
    const { renderContainer, renderItem } = this;
    // TODO manage 'edit' mode (without ledger)
    return (
      <LedgerContianer
        renderReady={props => <LedgerAddressList {...props} {...{ renderContainer, renderItem }} />}
      />
    );
  }
}

LedgerKeystoreCreationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  formChange: PropTypes.func.isRequired,
};
