import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import FormField from '~/components/common/form_field';
import ColorPicker from '~/components/common/color_picker';
import NetworkSelector from '~/components/common/network_selector';

export default class NetworkForm extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  }
  render() {
    const { formChange, formData } = this.props;
    return (
      <Form.Field>
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `Digix DAO`" label="Name" name="name" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `DGD`" label="Symbol" name="symbol" {...{ formChange, formData }} />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `0x1234...cdef`" label="Address" name="address" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `3`" label="Decimals" name="decimals" type="number" {...{ formChange, formData }} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="metwork">Network</label>
            <NetworkSelector name="network" showDisabled {...{ formData, formChange }} />
          </Form.Field>
          <ColorPicker label="Token Color" {...{ formData, formChange }} />
        </Form.Group>
      </Form.Field>
    );
  }
}
