import uuid from 'uuid';

import { actions as keystoreActions } from '~/actions/keystore';
import { actions as addressActions } from '~/actions/address';
import { throwIfExistingAddress } from '~/helpers/validation';

function addressesAreInvalid(addresses) {
  return addresses.some(a => !a.name);
}

export function create(formData) {
  return (dispatch, getState) => {
    const { type, addresses } = formData;
    if (!type) { throw new Error('You must provide a wallet type'); }
    const addedAddresses = Object.values(addresses).filter(a => a.enabled);
    if (addressesAreInvalid(addedAddresses)) { throw new Error('You must provide a name for all addresses'); }
    throwIfExistingAddress(addedAddresses.map(a => a.address), getState);
    // validation passed, now let's add them to the store
    const id = uuid();
    // TODO save the name, first address for future identifying
    // TODO revert adding if the address is already defined
    // create keystore instance
    dispatch({ type: keystoreActions.CREATE_KEYSTORE, payload: { type, id } });
    addedAddresses.forEach((address) => {
      dispatch({ type: addressActions.CREATE_ADDRESS, payload: { ...address, keystore: id } });
    });
  };
}

export function update(formData, oldData) {
  return (dispatch, getState) => {
    // const addedAddresses =
    const addresses = Object.values(formData.addresses);
    const oldAddresses = oldData.addresses.reduce((o, a) => ({ ...o, [a.kdPath]: a }), {});
    // validate
    if (addressesAreInvalid(addresses.filter(a => a.enabled))) { throw Error('You must provide a name for all addresses'); }
    // update the store for each address
    // ensure they don't exist in another store
    const newAddresses = addresses.filter(a => !oldAddresses[a.kdPath]).map(a => a.address);
    throwIfExistingAddress(newAddresses, getState);
    addresses.forEach((address) => {
      const exists = oldAddresses[address.kdPath];
      // delete the address if it's disabled
      if (exists && !address.enabled) {
        return dispatch({ type: addressActions.DELETE_ADDRESS, payload: address.address });
      }
      // update the address if it exists already
      if (exists) {
        return dispatch({ type: addressActions.UPDATE_ADDRESS, payload: address });
      }
      // doesn't exist, add it
      return dispatch({ type: addressActions.CREATE_ADDRESS, payload: { ...address, keystore: oldData.id } });
    });
  };
}
