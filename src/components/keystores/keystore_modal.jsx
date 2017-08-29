import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';

import { getKeystoreTypes, getNetworksWithTokens, getDefaultNetworks } from '~/selectors';

import EZModal from 'sui-react-ezmodal';

class KeystoreModal extends Component {
  static propTypes = {
    initiallyOpen: PropTypes.bool,
    submitFunc: PropTypes.func.isRequired,
    header: PropTypes.string,
    form: PropTypes.func.isRequired,
    trigger: PropTypes.node.isRequired,
    removeFunc: PropTypes.func,
    hideMenu: PropTypes.bool,
    data: PropTypes.object,
    keystoreTypes: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    networks: PropTypes.array.isRequired,
    skipConfirmation: PropTypes.bool,
    defaultNetworks: PropTypes.array.isRequired,
    size: PropTypes.string,
  };
  static defaultProps = {
    size: undefined,
    initiallyOpen: undefined,
    header: undefined,
    removeFunc: undefined,
    hideMenu: undefined,
    data: undefined,
    onClose: undefined,
    skipConfirmation: false,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { loading: false, error: false };
  }
  componentDidMount() {
    if (this.props.skipConfirmation) {
      // populate the name autoamtically
      this.handleSubmit({ ...this.getDefaultData(), name: 'Imported Keystore' }).then(() => {
        this.handleClose();
      });
    }
  }
  getDefaultData() {
    const { data = {}, networks, defaultNetworks } = this.props;
    // set the default network if it's not defined (can be blank array if no networks set)
    return {
      ...data,
      networks: data.networks || defaultNetworks,
      tokens: data.tokens || networks.reduce((o, network) => (
        o.concat((network.tokens || []).map(token => token.default && token.id).filter(a => a))
      ), []),
    };
  }
  handleSubmit(newFormData) {
    this.setState({ error: false });
    // it's async, lets show some loading UI
    return new Promise((resolve, reject) => {
      this.setState({ loading: true });
      setTimeout(() => {
        let func;
        // sync
        try {
          func = this.props.submitFunc(newFormData, this.props.data);
        } catch (error) {
          this.setState({ loading: false, error });
          reject();
        }
        // async promise
        if (func && func.then) {
          func.then(() => {
            this.setState({ loading: false });
            resolve();
          })
            .catch((error) => {
              this.setState({ loading: false, error });
              reject();
            });
        } else {
          // sync
          resolve();
        }
      }, 10);
    });
  }
  handleRemove() {
    // TODO some validation?
    this.props.removeFunc(this.props.data.id);
  }
  handleClose() {
    if (this.props.onClose) { this.props.onClose(); }
    this.resetState();
  }
  resetState() {
    this.setState({ loading: false, error: false });
  }
  render() {
    const KeystoreForm = this.props.form;
    const handleRemove = this.props.removeFunc && this.handleRemove;
    const { keystoreTypes, hideMenu } = this.props;
    return (
      <EZModal
        initiallyOpen={this.props.initiallyOpen}
        size={this.props.size}
        header={({ formData }) => this.props.header || (!formData.type && 'Select Keystore Type') || 'Create Keystore'}
        data={this.getDefaultData()}
        loading={this.state.loading}
        error={this.state.error}
        trigger={this.props.trigger}
        handleSubmit={this.handleSubmit}
        handleRemove={handleRemove}
        onClose={this.handleClose}
        onReset={this.resetState}
        noSubmitButton={({ formData }) => !formData.type}
        content={props => (
          (this.props.skipConfirmation && !this.state.error) ?
            <Divider hidden /> :
            <KeystoreForm {...props} {...{ keystoreTypes, hideMenu }} />
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  keystoreTypes: getKeystoreTypes(state),
  networks: getNetworksWithTokens(state),
  defaultNetworks: getDefaultNetworks(state),
  // default networks
});

export default connect(mapStateToProps)(KeystoreModal);
