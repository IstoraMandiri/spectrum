import creationForm from './cold_keystore_creation_form';
import editForm from './cold_keystore_edit_form';
import transactionSigner from './cold_keystore_transaction_signer';

import * as actions from './cold_keystore_actions';

const components = {
  creationForm,
  editForm,
  transactionSigner,
};

export default {
  components,
  actions,
};
