import React, { PropTypes, Component } from 'react';
import { Button, Grid, Icon, Header } from 'semantic-ui-react';
import { abi, unlinked_binary as binary } from '@digix/truffle-gnosis-multisig/build/contracts/MultiSig.json';

import AddressInput from '~/components/common/address_input';
import NetworkTokensSelector from '~/components/common/network_tokens_selector';
import NetworkSelector from '~/components/common/network_selector';

import FormField from '~/components/common/form_field';
import TransactionModal from '~/components/transactions/transaction_modal';
import Web3Connect from '~/helpers/web3/connect';

import MultisigKeystoreInfo from './multisig_keystore_info';
import MultisigKeystoreDeployForm from './multisig_keystore_deploy_form';

class MultisigKeystoreCreationForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.handleMined = this.handleMined.bind(this);
  }
  handleTransaction({ owners, required, count }, web3) {
    return web3.eth.contract(abi).new(owners.slice(0, count), required, { data: binary });
  }
  handleMined({ txData: { contractAddress } }) {
    this.props.formChange({ name: 'address', value: contractAddress });
  }
  renderMenu() {
    const { formData, formChange } = this.props;
    // get web3
    return (
      <Grid stackable textAlign="center">
        <Grid.Column width={8}>
          <Header as="h3" icon>
            <Icon name="upload" color="blue" />
            Deploy New Contract
            <Header.Subheader content="Create a new contract and configure owners" />
          </Header>
          {!formData.networks ?
            <NetworkSelector onChange={({ id }) => formChange({ name: 'networks', value: [id] })} />
          :
            <TransactionModal
              {...this.props}
              size="small"
              data={{ networkId: formData.networks[0] }}
              trigger={<Button color="blue" fluid content="Configure Deployment" onClick={e => e.preventDefault()} />}
              header="Deploy New Multisig Wallet"
              handleTransaction={this.handleTransaction}
              onMined={this.handleMined}
              form={MultisigKeystoreDeployForm}
            />
          }
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h3" icon>
            <Icon name="linkify" color="orange" />
            Use Existing Address
            <Header.Subheader content="Add an already-deployed multisig wallet instance" />
          </Header>
          <AddressInput
            showQrScanner
            hideDropdown
            name="address"
            placeholder="Enter Conrtract Address"
            {...{ formData, formChange }}
          />
        </Grid.Column>
      </Grid>
    );
  }
  renderDeployedForm() {
    const { formData, formChange } = this.props;
    return (
      <div>
        <AddressInput
          label="Deployed Multisig Contract Address"
          showQrScanner
          hideDropdown
          name="address"
          placeholder="Enter Conrtract Address"
          {...{ formData, formChange }}
        />
        <FormField placeholder="e.g. `Group Foundation Wallet`" label="Wallet Name" name="name" {...{ formChange, formData }} />
        {formData.networks && <p>Deployed to {formData.networks[0]}</p>}
        <NetworkTokensSelector noNetworks={!!formData.networks} singleSelection {...{ formChange, formData }} />
        <MultisigKeystoreInfo {...this.props} />
      </div>
    );
  }
  render() {
    const { formData: { address } } = this.props;
    if (!address) { return this.renderMenu(); }
    return this.renderDeployedForm();
  }
}

export default Web3Connect(MultisigKeystoreCreationForm);
