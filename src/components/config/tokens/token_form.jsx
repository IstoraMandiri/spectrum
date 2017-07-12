import React, { PropTypes, Component } from 'react';
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
          <FormField placeholder="e.g. `[#120]Digix DAO`" label="[#119]Name" name="name" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `[#122]DGD`" label="[#121]Symbol" name="symbol" {...{ formChange, formData }} />
        </Form.Group>
        <Form.Group widths="equal">
          <FormField placeholder="e.g. `[#124]0x1234...cdef`" label="[#123]Address" name="address" {...{ formChange, formData }} />
          <FormField placeholder="e.g. `[#126]3`" label="[#125]Decimals" name="decimals" type="number" {...{ formChange, formData }} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="metwork">[#127]Network</label>
            <NetworkSelector name="network" showDisabled {...{ formData, formChange }} />
          </Form.Field>
          <ColorPicker label="[#128]Token Color" {...{ formData, formChange }} />
        </Form.Group>
      </Form.Field>
    );
  }
}
