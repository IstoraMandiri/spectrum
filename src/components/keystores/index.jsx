import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Message, Table, Grid, Label, Segment, Header, Icon } from 'semantic-ui-react';

import { createKeystore, updateKeystore, deleteKeystore } from '~/actions/keystore';
import { getKeystores } from '~/selectors';

import KeystoreModal from './keystore_modal';
import KeystoreEditForm from './keystore_edit_form';
import Address from './address';
import KeystoreButtons from './keystore_buttons';

class Keystores extends Component {
  static propTypes = {
    keystores: PropTypes.array.isRequired,
    updateKeystore: PropTypes.func.isRequired,
    deleteKeystore: PropTypes.func.isRequired,
  }
  renderKeystores() {
    return this.props.keystores.map(keystore => (
      <Segment key={keystore.id}>
        <KeystoreModal
          {...this.props}
          header={`Edit Keystore: ${keystore.type.name}`}
          submitFunc={this.props.updateKeystore}
          removeFunc={this.props.deleteKeystore}
          data={keystore}
          form={KeystoreEditForm}
          trigger={
            <Label ribbon basic color={keystore.type.color} style={{ cursor: 'pointer' }}>
              <Icon name={keystore.type.icon} />
              {keystore.type.name}
            </Label>
          }
        />
        <Header size="tiny" disabled as="span">{keystore.type.subtitle}</Header>
        <Table basic="very">
          <Table.Body>
            {keystore.addresses.map(address => (
              <Address {...this.props} key={address.address} keystore={keystore} address={address} />
            ))}
          </Table.Body>
        </Table>
      </Segment>
    ));
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={7}>
          <Header>
            Keystores
            <Header.Subheader>Manage your Accounts</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={9} textAlign="right">
          <KeystoreButtons {...this.props} />
        </Grid.Column>
        <Grid.Column width={16}>
          {(!this.props.keystores || this.props.keystores.length === 0) ?
            <Message
              info
              icon="key"
              header="No Keystores Created"
              content="Please create or import a new keystore"
            />
            :
            <Segment.Group style={{ background: 'white' }}>
              {this.renderKeystores()}
            </Segment.Group>
          }
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  keystores: getKeystores(state),
});

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
};

export default connect(mapStateToProps, actions)(Keystores);
