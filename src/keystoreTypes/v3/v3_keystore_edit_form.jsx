import React, { PropTypes, Component } from 'react';

import FormField from '~/components/common/form_field';
import NetworkTokensSelector from '~/components/common/network_tokens_selector';

import DownloadV3KeystoreButton from './v3_keystore_download_button';

export default class V3KeystoreEditForm extends Component {
  componentDidMount() {
    const address = this.props.data.addresses[0];
    this.props.setFormData({
      type: this.props.data.type,
      name: address.name,
      tokens: address.tokens.map(({ id }) => id),
      networks: address.networks.map(({ id }) => id),
    });
  }
  render() {
    const { formChange, formData, data } = this.props;
    if (!formData.name) { return null; } // don't render until we've updated the data
    return (
      <div>
        <FormField placeholder="Nickname for the Address" label="Name" name="name" {...{ formChange, formData }} />
        <NetworkTokensSelector {...{ formChange, formData }} />
        <DownloadV3KeystoreButton keystore={data} props={{ content: 'Download JSON', icon: 'download', color: 'blue' }} />
      </div>
    );
  }
}

V3KeystoreEditForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  formChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};
