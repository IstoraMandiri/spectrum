import uuid from 'uuid';

import { actions as keystoreActions } from '~/actions/keystore';
import { actions as addressActions } from '~/actions/address';

import { isAddress, toChecksumAddress } from '~/helpers/stringUtils';
import { throwIfExistingAddress } from '~/helpers/validation';

export function create(formData) {
  return (dispatch, getState) => {
    const { name, address: plainAddress, networks = [], type, tokens = [] } = formData;
    if (!type) {
      throw new Error('Please select a wallet type');
    }
    if (!name) {
      throw new Error('[#36]You must provide a name');
    }
    if (!isAddress(plainAddress)) {
      throw new Error('Invalid Address');
    }
    const address = toChecksumAddress(plainAddress);
    // ensure it doesnt already exist
    throwIfExistingAddress([address], getState);
    // new keystore id
    const id = uuid();
    // create keystore instance
    dispatch({ type: keystoreActions.CREATE_KEYSTORE, payload: { type, id } });
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
