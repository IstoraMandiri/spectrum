import React, { PropTypes, Component } from 'react';
import { Table } from 'semantic-ui-react';

import QRMultiButton from '~/components/common/qr_multi_button';
import { isAddress, toChecksumAddress } from '~/helpers/stringUtils';

import Address from './cold_keystore_address';

export default class ColdKeystoreCreationForm extends Component {
  static propTypes = {
    editing: PropTypes.bool,
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    editing: false,
  }
  constructor(props) {
    super(props);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.validateScan = this.validateScan.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }
  getNewId() {
    const addresses = Object.values(this.props.formData.addresses || {});
    return `${(addresses.length ? parseInt(Object.keys(addresses)[addresses.length - 1], 10) + 1 : 0)}`;
  }
  handleItemChange(itemId, e) {
    const addresses = (this.props.formData || {}).addresses || {};
    const update = { [e.target.name]: e.target.value };
    this.props.formChange({ name: 'addresses', value: { ...addresses, [itemId]: { ...addresses[itemId], ...update } } });
  }
  handleScan(address) {
    this.handleItemChange(this.getNewId(), { target: { name: 'address', value: address } });
  }
  validateScan(code) {
    if (!isAddress(code)) throw new Error('Code is not a valid address');
    const checkSummed = toChecksumAddress(code);
    Object.values(this.props.formData.addresses || {}).forEach(({ address }) => {
      if (address === checkSummed) throw new Error('Address already added');
    });
    return checkSummed;
  }
  renderItems() {
    const { formData, editing } = this.props;
    const addresses = Object.values(formData.addresses || {});
    const lastId = this.getNewId();
    const items = addresses.map((data = {}, itemId) =>
      <Address key={itemId.toString()} {...{ editing, itemId, data, onChange: this.handleItemChange }} />,
    );
    // add an additional row is there are no free rows
    if (!addresses.find(a => !a.address)) {
      return items.concat([
        <Address key={lastId} {...{ editing, itemId: lastId, data: {}, onChange: this.handleItemChange }} />,
      ]);
    }
    return items;
  }
  render() {
    return (
      <div>
        <Table>
          <Table.Body>{this.renderItems()}</Table.Body>
        </Table>
        <div style={{ textAlign: 'right' }}>
          <QRMultiButton header="#43Scan Multiple Addresses to Add" onScan={this.handleScan} validateScan={this.validateScan} />
        </div>
      </div>
    );
  }
}
