import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ipfsAPI from 'ipfs-api';
import multihash from 'multi-hash';
import { Form, Button } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import { IPFS_API_CONFIG } from '~/helpers/constants';
import IPFSImage from './ipfs_image';

const ipfs = ipfsAPI(IPFS_API_CONFIG);

export default class IPFSUploader extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    formChange: PropTypes.func,
    beforeUpload: PropTypes.func,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
  };
  static defaultProps = {
    label: undefined,
    formChange: undefined,
    beforeUpload: undefined,
    onChange: undefined,
    multiple: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { uploading: false, error: false, hex: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    e.target.nextSibling.click();
  }
  handleUpload(e) {
    if (this.props.beforeUpload) {
      const { target } = e;
      this.setState({ uploading: true, hex: false, error: false });
      return new Promise(resolve => setTimeout(resolve, 10))
        .then(() => this.props.beforeUpload({ target }))
        .then(buffer => this.saveToIpfs(buffer));
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.saveToIpfs(Buffer.from(reader.result));
    return reader.readAsArrayBuffer(file);
  }
  saveToIpfs(buffer) {
    // TODO generate the thumbnail
    const { onChange, formChange, name } = this.props;
    this.setState({ uploading: true, hex: false, error: false });
    if (formChange) { formChange({ name, value: undefined }); }
    let data;
    ipfs.add(buffer)
      .then((response) => {
        const docHash = response[0].hash;
        data = {
          docHash,
          timestamp: new Date(),
          title: 'My test file', // TODO make it configurable
        };
        const jsonBuffer = Buffer.from(JSON.stringify(data));
        return ipfs.add(jsonBuffer);
      })
      .then(([{ hash: ipfsHash }]) => {
        const hex = multihash.decode(ipfsHash).toString('hex');
        // const hash
        if (onChange) {
          onChange({ ipfsHash, hex });
        } else {
          formChange({ name, value: hex });
        }
        this.setState({ uploading: false, hex });
      }).catch((error) => {
        this.setState({ uploading: false, error });
      });
  }
  render() {
    const { uploading, hex, error } = this.state;
    return (
      <Form.Field>
        <label htmlFor="upload">{this.props.label || 'Upload to IPFS'}</label>
        <Form.Group widths="equal">
          {hex &&
            <Form.Field>
              <EZModal
                size="small"
                header="Uploaded Certificate"
                noSubmitButton
                closeButtonText="Done"
                content={<IPFSImage hex={hex} showHash />}
                trigger={<Button content="View" icon="image" color="blue" fluid onClick={e => e.preventDefault()} />}
              />
            </Form.Field>
          }
          <Form.Field>
            <Button
              icon="upload"
              color={uploading ? 'orange' : 'green'}
              content={uploading ? 'Uploading...' : 'Browse File'}
              disabled={uploading}
              fluid
              onClick={this.handleClick}
            />
            <input
              type="file"
              style={{ visibility: 'hidden', position: 'absolute' }}
              onChange={this.handleUpload}
              multiple={this.props.multiple}
            />
          </Form.Field>
          {error &&
            <Form.Field>{`${error}`}</Form.Field>
          }
        </Form.Group>
      </Form.Field>
    );
  }
}
