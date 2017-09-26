import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DownloadJSONButton from '~/components/common/download_json_button';

import { getV3FileName } from '~/helpers/stringUtils';

export default class V3KeystoreDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.handleGetFileInfo = this.handleGetFileInfo.bind(this);
  }
  handleGetFileInfo() {
    return new Promise((resolve) => {
      const { data, addresses } = this.props.keystore;
      const parsed = JSON.parse(data);
      const { address } = parsed;
      // update the name
      const content = JSON.stringify({ ...parsed, name: addresses[0].name });
      const name = getV3FileName(address);
      resolve({ name, content });
    });
  }
  render() {
    return (
      <DownloadJSONButton {...this.props} getFileInfo={this.handleGetFileInfo} />
    );
  }
}

V3KeystoreDownloadButton.propTypes = {
  keystore: PropTypes.object.isRequired,
};
