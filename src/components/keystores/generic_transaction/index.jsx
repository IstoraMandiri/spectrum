import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { getAddresses } from '~/selectors';

import { toBigNumber } from '~/helpers/stringUtils';

import TransactionModal from '~/components/transactions/transaction_modal';
import MenuSystem from '~/components/common/menu_system';

import GenericTransactionForm from './generic_transaction_form';

class GenericTransaction extends Component {
  render() {
    return (
      <TransactionModal
        disableAdvanced
        header="Generic Transaction Signer"
        handleTransaction={({ ethValue, ...rest }, web3) => {
          if (!ethValue) { throw new Error('You must enter a value'); }
          const value = toBigNumber(ethValue).shift(18);
          return web3.eth.sendTransaction({ ...rest, value });
        }}
        renderForm={props => (
          <MenuSystem
            equalWidths
            // TODO reset form data on navigate
            tabs={[
              { name: 'Generic Data', icon: 'list', component: <GenericTransactionForm {...props} /> },
              { name: 'Contract Method', icon: 'file text outline', component: <p>TODO</p> },
              { name: 'Raw Transaction', icon: 'code', component: <p>TODO</p> },
              { name: 'Text Message', icon: 'pencil', component: <p>TODO</p> },
            ]}
          />
        )}
        trigger={
          <Button onClick={e => e.preventDefault()} basic icon="pencil" content="Sign" />
        }
      />
    );
  }
}

export default connect(s => ({ addresses: getAddresses(s) }))(GenericTransaction);
