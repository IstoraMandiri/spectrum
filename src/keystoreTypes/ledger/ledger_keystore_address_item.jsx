import React, { PropTypes, Component } from 'react';
import { Image, Table, Checkbox, Input } from 'semantic-ui-react';

import blockie from '~/helpers/blockie';
import NetworkTokensSelector from '~/components/common/network_tokens_selector';

export default class LedgerKeystoreAddressItem extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    kdPath: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleToggle() {
    const value = { enabled: !this.props.data.enabled };
    // set the address & kdPath if it's not set before
    if (!this.props.data.address) {
      value.address = this.props.address;
      value.kdPath = this.props.kdPath;
      value.name = value.kdPath; // set default name to the kdpath
    }
    this.props.onChange({ name: this.props.kdPath, value });
  }
  handleChange(e) {
    this.props.onChange({ name: this.props.kdPath, value: { [e.target.name]: e.target.value } });
  }
  render() {
    const { address, data } = this.props;
    return (
      <Table.Row positive={data.enabled}>
        <Table.Cell colSpan={data.enabled ? 1 : 100}>
          <Checkbox
            name="enabled"
            tabIndex="-1"
            label={
              <label htmlFor={address}>
                <Image src={blockie(address)} avatar style={{ marginTop: '-0.4em' }} />
                {' '}{address}
              </label>
            }
            checked={data.enabled}
            onChange={this.handleToggle}
          />
        </Table.Cell>
        {data.enabled &&
          <Table.Cell>
            <Input
              fluid
              size="small"
              placeholder="Enter Name"
              name="name"
              style={{ width: '12em' }}
              onChange={this.handleChange}
              value={data.name || ''}
            />
          </Table.Cell>
        }
        {data.enabled &&
          <Table.Cell>
            <NetworkTokensSelector modal {...{ formChange: this.handleChange, formData: data }} />
          </Table.Cell>
        }
      </Table.Row>
    );
  }
}
