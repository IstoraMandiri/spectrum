import v3 from './v3';
import ledger from './ledger';
import cold from './cold';
import multisig from './multisig';

const keystores = { v3, cold, ledger, multisig };

export function getKeystoreComponent({ type, id }) {
  return ((keystores[id] || {}).components || {})[type] || null;
}

export function getKeystoreAction({ type, id }) {
  return ((keystores[id] || {}).actions || {})[type] || null;
}
