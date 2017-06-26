import creationForm from './ledger_keystore_creation_form';
import editForm from './ledger_keystore_edit_form';
import transactionSigner from './ledger_keystore_transaction_signer';
import * as actions from './ledger_keystore_actions';

const components = {
  creationForm,
  editForm,
  transactionSigner,
};

export default {
  components,
  actions,
};
