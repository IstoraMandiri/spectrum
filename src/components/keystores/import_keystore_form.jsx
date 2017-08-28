import React, { PropTypes, Component } from 'react';
import { Header, Form, Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Wallet from 'ethereumjs-wallet';

import { getFileContents } from '~/helpers/fileUtils';

// TODO decouple with V3, add HD wallet import

export default class ImportKeystoreForm extends Component {
  static propTypes = {
    setError: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    onGetPrivateKey: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { fileContent: null, error: null, password: '', keystore: null };
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.handleUnlock = this.handleUnlock.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }
  handleUnlock(e) {
    e.preventDefault();
    const { fileContent, password, keystore } = this.state;
    const { setError, setLoading, onGetPrivateKey } = this.props;
    setError(false);
    setLoading(true);
    setTimeout(() => {
      try {
        const wallet = Wallet.fromV3(fileContent, password, true);
        const privateKey = wallet.getPrivateKey().toString('hex');
        onGetPrivateKey({ privateKey, password, name: keystore.name }, this.props);
      } catch (error) {
        this.props.setError(error);
        setLoading(false);
      }
    }, 10);
  }
  handleUpdatePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleFileDrop(file) {
    this.props.setError(false);
    getFileContents(file).then((fileContent) => {
      try {
        const keystore = JSON.parse(fileContent);
        if (keystore.version !== 3) {
          throw new Error('Keystore type not supported');
        }
        this.setState({ fileContent, keystore });
      } catch (e) {
        throw new Error('Keystore type not supported');
      }
    }).catch(error => this.props.setError(error));
  }
  renderDropzone() {
    return (
      <Dropzone
        className="ui message info dragbox"
        activeClassName="active"
        onDrop={files => this.handleFileDrop(files[0])}
      >
        <div className="ui padded one column grid">
          <div className="center aligned column">
            <i className="icon upload large" />
            <p>Click or drag and drop keystore here to upload.</p>
          </div>
        </div>
      </Dropzone>
    );
  }
  renderUnlock() {
    const { keystore, password } = this.state;
    return (
      <Form onSubmit={this.handleUnlock}>
        <Header>
          Unlock Keystore: {keystore.name}
          <Header.Subheader>0x{keystore.address}</Header.Subheader>
        </Header>
        <Form.Field>
          <Input
            fluid
            onChange={this.handleUpdatePassword}
            value={password}
            action={{ color: 'green', labelPosition: 'right', icon: 'unlock', content: 'Unlock Keystore' }}
            placeholder="Enter Password"
            type="password"
          />
        </Form.Field>
      </Form>
    );
  }
  render() {
    return !this.state.fileContent ? this.renderDropzone() : this.renderUnlock();
  }
}
