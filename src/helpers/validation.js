import { lowercaseUnprefixedHex, capitalize, isAddress } from '~/helpers/stringUtils';
import { getAddresses } from '~/selectors';

export function validateProps(requiredProps, props) {
  Object.keys(requiredProps).forEach((requiredKey) => {
    const requiredProp = requiredProps[requiredKey];
    if (!requiredProp) { return null; }
    if (requiredProp === 'number' && isNaN(props[requiredKey])) {
      throw Error(`"${capitalize(requiredKey)}" must be a Number`);
    }
    if (requiredProp === 'address' && !isAddress(props[requiredKey])) {
      throw Error(`"${capitalize(requiredKey)}" must be a valid address`);
    }
    if (props[requiredKey] === undefined) {
      throw Error(`"${capitalize(requiredKey)}" is not set`);
    }
    return null;
  });
}

export function throwIfExistingAddress(addresses, getState) {
  const sanitizedAdddresses = addresses.map(lowercaseUnprefixedHex);
  const existingAddresses = getAddresses(getState()).map(({ address }) => lowercaseUnprefixedHex(address));
  const existing = existingAddresses.find(address => sanitizedAdddresses.indexOf(address) > -1);
  if (existing) {
    throw new Error(`Address ${existing} already exists`);
  }
}
