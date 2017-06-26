import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Grid, Header, Divider } from 'semantic-ui-react';

import { showTxSigningModal } from '~/actions/session';
import { getAddresses } from '~/selectors';

import MenuSystem from '~/components/common/menu_system';
import QrCode from '~/components/common/qr_code';
import QrReader from '~/components/common/qr_reader';

class Signer extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    sign: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { unparsed: '' };
    this.handleDataUpdate = this.handleDataUpdate.bind(this);
  }
  handleDataUpdate(e) {
    // TODO add additional parsing methods (e.g. raw tx)
    const { value } = e.target;
    const { addresses, sign } = this.props;
    try {
      let txData = JSON.parse(value);
      if (!txData.from) { txData = JSON.parse(txData); }
      if (txData && this.state.txData !== txData) {
        // make it open sigining modal
        const address = addresses.find(a => a.address === txData.from);
        sign({ address, txData }).then(({ signedTx }) => {
          this.setState({ signedTx });
        });
      }
      this.setState({ unparsed: value, txData });
    } catch (error) {
      this.setState({ unparsed: value, txData: null });
    }
  }
  renderInput() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <TextArea
              onChange={this.handleDataUpdate}
              name="unparsed"
              placeholder="Unsigned Transaction (JSON Data)"
              value={this.state.unparsed}
              rows={3}
            />
            <Divider hidden />
            <QrReader onScan={(value) => { this.handleDataUpdate({ target: { value } }); }} />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
  renderOutput() {
    return <QrCode data={this.state.signedTx} />;
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header>
            Transaction Signer
            <Header.Subheader>Tool for signing transactions</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={16}>
          <MenuSystem
            equalWidths
            tabs={[
              { name: 'Form', icon: 'list', component: <p>Test</p> },
              { name: 'JSON', icon: 'code', component: <p>Test2</p> },
              { name: 'QR Code', icon: 'qrcode', component: <p>Test3</p> },
            ]}
          />
          {/* { signedTx ? this.renderOutput() : this.renderInput() } */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  state => ({ addresses: getAddresses(state) }),
  { sign: showTxSigningModal },
)(Signer);
