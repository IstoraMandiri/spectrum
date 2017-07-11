import Wallet from 'ethereumjs-wallet';
import uuid from 'uuid';

import { actions as keystoreActions } from '~/actions/keystore';
import { actions as addressActions } from '~/actions/address';
import { throwIfExistingAddress } from '~/helpers/validation';

export function create(formData) {
  return (dispatch, getState) => {
    const { password, confirmPassword, name, type } = formData;
    if (!type) {
      throw new Error('Please select a wallet type');
    }
    if (!name) {
      throw new Error('[#36]You must provide a name');
    }
    if (!password || password.length < 6) {
      throw new Error('Password Must be at least 6 characters long (and ideally > 24)');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    // Generate wallet
    const { n, salt, iv, networks, tokens, privateKey } = formData;
    // use private key if it's given, otherwise generate
    const wallet = (privateKey && Wallet.fromPrivateKey(new Buffer(privateKey, 'hex'))) || Wallet.generate();
    const address = wallet.getChecksumAddressString();
    // ensure it doesnt already exist
    throwIfExistingAddress([address], getState);
    // let the UI update with a loading spinner...
    const params = {
      salt: salt && new Buffer(salt, 'hex'),
      iv: iv && new Buffer(iv, 'hex'),
      n: n || 16384, // maybe use profiling (profilev3Iterations)?
    };
    const data = JSON.stringify(wallet.toV3(password, params));
    // new keystore id
    const id = uuid();
    // create keystore instance
    dispatch({ type: keystoreActions.CREATE_KEYSTORE, payload: { type, data, id } });
    // create address instance
    dispatch({ type: addressActions.CREATE_ADDRESS, payload: { address, networks, name, tokens, keystore: id } });
  };
}

export function update({ networks, tokens, name }, data) {
  return (dispatch) => {
    // TODO update password etc.
    const address = data.addresses[0].address;
    dispatch({ type: addressActions.UPDATE_ADDRESS, payload: { address, networks, tokens, name } });
  };
}
