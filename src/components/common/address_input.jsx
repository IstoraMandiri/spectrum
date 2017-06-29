import React, { PropTypes, Component } from 'react';
import { Input, Form, Label } from 'semantic-ui-react';

import { isAddress, toChecksumAddress } from '~/helpers/stringUtils';
import blockie from '~/helpers/blockie';

import AddressDropdown from './address_dropdown';
import QrButton from './qr_button';

export default class AddressInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    formChange: PropTypes.func,
    label: PropTypes.string,
    hideDropdown: PropTypes.bool,
    showQrScanner: PropTypes.bool,
  };
  static defaultProps = {
    placeholder: undefined,
    name: undefined,
    onChange: undefined,
    value: undefined,
    formChange: undefined,
    label: undefined,
    hideDropdown: false,
    showQrScanner: false,
  }
  constructor(props) {
    super(props);
    const value = this.getValue(this.props);
    this.state = { value, valid: isAddress(value), correctLength: true };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const value = this.getValue(nextProps);
    if (value !== this.state.value) {
      this.handleChange({ target: { value } });
    }
  }
  getValue({ value, formData, name }) {
    return (formData && formData[name]) || value || '';
  }
  handleAddressChange(e, { value }) {
    return this.handleChange({ target: { value } });
  }
  handleChange(e) {
    const val = e.target.value.trim();
    const correctLength = (val.length === 40) || (val.length === 42);
    const valid = isAddress(val);
    const value = valid ? toChecksumAddress(val) : val;
    const changeEvent = this.props.formChange || this.props.onChange;
    this.setState({ value, valid, correctLength });
    return changeEvent && changeEvent({ target: { name: this.props.name, value } });
  }
  renderLabel() {
    const { valid, value } = this.state;
    if (!valid) { return undefined; }
    return {
      basic: true,
      image: true,
      className: 'image-only',
      content: <img alt={value} src={blockie(value)} />,
    };
  }
  renderInput() {
    const { value, valid, correctLength } = this.state;
    return (
      <span>
        <Input
          fluid
          key={0}
          className="labeled"
          placeholder={this.props.placeholder || 'Enter Address'}
          value={value}
          name={this.props.name}
          onChange={this.handleChange}
          action={!this.props.hideDropdown || this.props.showQrScanner}
        >
          {valid && <Label className="image-only" basic image><img src={blockie(value)} alt={value} /></Label>}
          <input />
          {!this.props.hideDropdown &&
            <AddressDropdown value={value} onChange={this.handleAddressChange} />
          }
          {this.props.showQrScanner &&
            <QrButton icon="qrcode" onScan={(val) => { this.handleAddressChange(null, { value: val }); }} />
          }
        </Input>
        {value && !correctLength &&
          <Label
            style={{ zIndex: '100', position: 'absolute' }}
            basic
            color="red"
            pointing
            content="Copy and paste the address, do not manually type it out!"
          />
        }
        {(value && !valid && correctLength) &&
          <Label
            style={{ zIndex: '100', position: 'absolute' }}
            basic
            color="red"
            pointing
            content="Invalid Checksum!"
          />
        }
      </span>
    );
  }
  render() {
    const { label, name } = this.props;
    if (!label) return this.renderInput();
    return (
      <Form.Field>
        <label htmlFor={name}>{label}</label>
        {this.renderInput()}
      </Form.Field>
    );
  }
}
