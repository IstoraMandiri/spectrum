import creationForm from './multisig_keystore_creation_form';
import editForm from './multisig_keystore_edit_form';
import transactionSigner from './multisig_keystore_transaction_signer';

import * as actions from './multisig_keystore_actions';

const components = {
  creationForm,
  editForm,
  transactionSigner,
};

export default {
  components,
  actions,
};
