import React, { PropTypes, Component } from 'react';
import DropdownSelector from '~/components/common/dropdown_selector';
import { Form } from 'semantic-ui-react';

import KeystoreTypeMessage from './keystore_type_message';
import KeystoreMenu from './keystore_menu';

export default class KeystoreSelector extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    resetFormData: PropTypes.func.isRequired,
    keystoreType: PropTypes.object,
    keystoreTypes: PropTypes.array.isRequired,
  }
  static defaultProps = {
    keystoreType: undefined,
  }
  renderDropdown() {
    const { formChange, formData, resetFormData, keystoreType, keystoreTypes } = this.props;
    return (
      <Form.Field>
        <DropdownSelector
          defaultText="Select Keystore Type"
          name="type"
          items={keystoreTypes}
          {...{ formChange, formData, resetFormData }}
        />
        <KeystoreTypeMessage keystoreType={keystoreType} />
      </Form.Field>
    );
  }
  render() {
    const { keystoreType } = this.props;
    return keystoreType ? this.renderDropdown() : <KeystoreMenu {...this.props} />;
  }
}
