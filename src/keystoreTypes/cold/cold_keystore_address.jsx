import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Label, Checkbox } from 'semantic-ui-react';

import NetworkTokensSelector from '~/components/common/network_tokens_selector';
import AddressInput from '~/components/common/address_input';

export default class ColdKeystoreAddress extends Component {
  static propTypes = {
    editing: PropTypes.bool,
    itemId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }
  static defaultProps = {
    editing: false,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleChange(e) {
    if (this.props.data.address || e.target.name === 'address') {
      this.props.onChange(this.props.itemId, e);
    }
  }
  handleToggle() {
    this.props.onChange(this.props.itemId, { target: { name: 'enabled', value: !this.props.data.enabled } });
  }
  render() {
    const { editing, data } = this.props;
    const removing = data.enabled === false;
    const oldItem = editing && data.exists;
    return (
      <Table.Row negative={removing}>
        {oldItem &&
          <Table.Cell width="1">
            <Checkbox name="enabled" tabIndex="-1" checked={!removing} onChange={this.handleToggle} disabled={!data.address} />
          </Table.Cell>
        }
        <Table.Cell
          width={oldItem ? '1' : undefined}
          colSpan={oldItem ? undefined : '2'}
        >
          {oldItem ?
            data.address
            :
            <AddressInput
              error={removing}
              fluid
              hideDropdown
              size="small"
              placeholder="Enter Address"
              name="address"
              onChange={this.handleChange}
              value={data.address || ''}
            />
          }
        </Table.Cell>
        <Table.Cell>
          <Input
            error={removing}
            disabled={!data.address || removing}
            fluid
            size="small"
            placeholder="Enter Name"
            name="name"
            onChange={this.handleChange}
            value={data.name || ''}
          />
        </Table.Cell>
        <Table.Cell width="1" style={{ minWidth: '9em' }}>
          {data.address ?
            <NetworkTokensSelector modal {...{ formChange: this.handleChange, formData: data }} disabled={removing} />
            :
            <Label>0<Label.Detail>Networks</Label.Detail></Label>
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}
