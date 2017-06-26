import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Modal, Button, Dimmer, Loader } from 'semantic-ui-react';

import { getKeystoreComponent } from '~/keystoreTypes';
import { getSigningModalData } from '~/selectors';
import { hideTxSigningModal } from '~/actions/session';

import TransactionInfo from '~/components/transactions/transaction_info';

class TransactionSigningOverlay extends Component {
  static propTypes = {
    data: PropTypes.object,
    hideTxSigningModal: PropTypes.func.isRequired,
  }
  static defaultProps = {
    data: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleFailure = this.handleFailure.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSetLoading = this.handleSetLoading.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSetLoading(loading) {
    this.setState({ loading });
  }
  handleClose(...args) {
    this.handleSetLoading(false);
    this.props.hideTxSigningModal(...args);
  }
  handleFailure() {
    this.props.hideTxSigningModal({ error: 'Could not find Address' });
  }
  handleCancel() {
    this.props.hideTxSigningModal({ error: 'Cancelled Signing' });
  }
  render() {
    const { data } = this.props;
    if (!data) { return null; }
    const { network, address, txData, ui } = data;
    const { keystore } = address;
    if (!txData || !keystore) { return null; }
    const SigningComponent = getKeystoreComponent({ id: keystore.type.id, type: 'transactionSigner' });
    return (
      <Modal open size="small">
        <Modal.Header>Sign Transaction</Modal.Header>
        <Modal.Content>
          {this.state.loading &&
            <Dimmer active inverted>
              <Loader>{this.state.loading}</Loader>
            </Dimmer>
          }
          <TransactionInfo {...{ address, ui, txData, network }} />
          <Divider hidden />
          <SigningComponent
            {...{ network, address, txData }}
            setLoading={this.handleSetLoading}
            hideTxSigningModal={this.handleClose}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel Signing" onClick={this.handleCancel} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  state => ({ data: getSigningModalData(state) }),
  { hideTxSigningModal },
)(TransactionSigningOverlay);
