import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Divider, Modal, Button, Dimmer, Loader } from 'semantic-ui-react';

import { getKeystoreComponent } from '~/keystoreTypes';
import { getSigningModalData } from '~/selectors';
import { hideTxSigningModal } from '~/actions/session';

import TransactionInfo from '~/components/transactions/transaction_info';
import Advanced from '~/components/common/advanced';

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
    this.state = { loading: false, autoBroadcast: true };
    this.handleFailure = this.handleFailure.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSetLoading = this.handleSetLoading.bind(this);
    this.handleSign = this.handleSign.bind(this);
  }
  handleSetLoading(loading) {
    this.setState({ loading });
  }
  handleBroadcast(args) {
    this.props.hideTxSigningModal(args);
  }
  handleSign(args) {
    this.handleSetLoading(false);
    if (args.error || this.state.autoBroadcast) {
      this.handleBroadcast(args);
    } else {
      this.setState({ signedTx: args.signedTx });
    }
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
    const { autoBroadcast, signedTx } = this.state;
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
          {!signedTx ?
            <div>
              <SigningComponent
                {...{ network, address, txData }}
                setLoading={this.handleSetLoading}
                hideTxSigningModal={this.handleSign}
              />
              <br />
              <Advanced>
                <br /><br />
                <Button
                  content="Broadcast Transaction"
                  icon={autoBroadcast ? 'checkmark' : 'remove'}
                  color={autoBroadcast ? 'green' : 'red'}
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ autoBroadcast: !autoBroadcast });
                  }}
                />
              </Advanced>
            </div>
          :
            <div>
              <p>
                <b>Signed Transaction:</b>
                <br />
                <code style={{ wordWrap: 'break-word' }}>{signedTx}</code>
              </p>
              <Button
                content="Broadcast Transaction"
                icon="bullhorn"
                color="green"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleBroadcast({ signedTx });
                }}
              />
            </div>
          }
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
