import uuid from 'uuid';

import { actions as keystoreActions } from '~/actions/keystore';
import { actions as addressActions } from '~/actions/address';

import { isAddress, toChecksumAddress } from '~/helpers/stringUtils';
import { throwIfExistingAddress } from '~/helpers/validation';

function validateAddress({ name, address }) {
  if (!isAddress(address)) {
    throw new Error('The address you provided is not a valid Ethereum address');
  }
  if (!name) {
    throw new Error('You must provide a name for all addresses');
  }
  return toChecksumAddress(address);
}

function validateFormData({ type, addresses }) {
  if (!type) { throw new Error('You must provide a wallet type'); }
  const addressArray = Object.values(addresses || []);
  const validAddresses = addressArray.map(a => a.address && { ...a, address: validateAddress(a) }).filter(a => a);
  if (!validAddresses.length) { throw new Error('No valid addresses defined'); }
  // ensure there are no duplciates
  const dupes = {};
  validAddresses.forEach((a) => {
    if (dupes[a.address]) { throw new Error('Duplicate addresses defined'); }
    dupes[a.address] = true;
  });
  return validAddresses;
}

export function create(formData) {
  return (dispatch, getState) => {
    // validate
    const validAddresses = validateFormData(formData);
    // ensure they don't exist already
    throwIfExistingAddress(validAddresses.map(a => a.address), getState);
    // new keystore id
    const id = uuid();
    // create keystore instance
    dispatch({ type: keystoreActions.CREATE_KEYSTORE, payload: { type: formData.type, id } });
    validAddresses.forEach((address) => {
      dispatch({ type: addressActions.CREATE_ADDRESS, payload: { ...address, keystore: id } });
    });
  };
}

export function update(formData, oldData) {
  return (dispatch, getState) => {
    // validate
    const validAddresses = validateFormData(formData);
    if (!validAddresses.find(a => !a.exists || a.enabled)) {
      throw new Error('You must have at least one address enabled. If you want to remove the keystore, click "remove"');
    }
    const newAddresses = validAddresses.filter(a => !a.exists).map(a => a.address); // ensure they don't exist already
    throwIfExistingAddress(newAddresses, getState);
    validAddresses.forEach((address) => {
      // remove the address if deisabled
      if (address.exists && !address.enabled) {
        return dispatch({ type: addressActions.DELETE_ADDRESS, payload: address.address });
      }
      // update the address if it exists already
      if (address.exists) {
        return dispatch({ type: addressActions.UPDATE_ADDRESS, payload: address });
      }
      // doesn't exist, add it
      return dispatch({ type: addressActions.CREATE_ADDRESS, payload: { ...address, keystore: oldData.id } });
    });
  };
}
