import { registerUIs } from '~/helpers/uiRegistry';

import creationForm from './multisig_keystore_creation_form';
import editForm from './multisig_keystore_edit_form';
import transactionSigner from './multisig_keystore_transaction_signer';
import MultisigKeystoreDeployTxUi from './multisig_keystore_deploy_tx_ui';
import * as actions from './multisig_keystore_actions';

registerUIs({ multisigKeystoreDeployTxUi: { component: MultisigKeystoreDeployTxUi } });

const components = {
  creationForm,
  editForm,
  transactionSigner,
};

export default {
  components,
  actions,
};
