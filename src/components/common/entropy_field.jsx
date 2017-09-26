import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

import EntropyGenerator from './entropy_generator';

export default class EntropyField extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    bits: PropTypes.number,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
  }
  static defaultProps = {
    bits: undefined,
    defaultValue: undefined,
    label: undefined,
  }
  componentDidMount() {
    const { formChange, defaultValue, name } = this.props;
    if (defaultValue) {
      formChange({ target: { name, value: defaultValue } });
    }
  }
  render() {
    const { formChange, formData, name, bits, label: pLabel, ...rest } = this.props;
    const value = formData[name] === undefined ? '' : formData[name];
    return (
      <Form.Field>
        {pLabel && <label htmlFor={pLabel}>{pLabel}</label>}
        <Input
          placeholder={`randomBytes(${bits ? bits / 8 : 32})`}
          type="password"
          {...rest}
          onChange={formChange}
          name={name}
          fluid
          value={value}
          action={<EntropyGenerator bits={bits} handleSubmit={(val) => { formChange({ name, value: val }); }} />}
        />
      </Form.Field>
    );
  }
}
