import { createDefaultSession } from '~/actions/session';
import { createKeystoreType } from '~/actions/keystoreType';
import { createNetwork, deleteNetwork } from '~/actions/network';
import { createToken, deleteToken } from '~/actions/token';
import { updateAddress } from '~/actions/address';

import { DEFAULT_KEYSTORE_TYPES, DEFAULT_NETWORKS, DEFAULT_TOKENS } from '~/helpers/constants';

import { availableNetworks, enabledNetworks, defaultNetworks } from '~/../spectrum.config';

const networks = DEFAULT_NETWORKS
.filter(n => !availableNetworks || availableNetworks.indexOf(n.id) > -1)
.map(n => ({
  ...n,
  enabled: enabledNetworks ? enabledNetworks.indexOf(n.id) > -1 : n.enabled,
  default: defaultNetworks ? defaultNetworks.indexOf(n.id) > -1 : n.default,
}));

const tokens = !availableNetworks ? DEFAULT_TOKENS : DEFAULT_TOKENS.filter(t => availableNetworks.indexOf(t.network) > -1);

export default function seedStore(store) {
  if (store.getState().orm.Session.items.length === 0) {
    // nothing to restore from, populate defaults...
    DEFAULT_KEYSTORE_TYPES.forEach(keystoreType => store.dispatch(createKeystoreType(keystoreType)));
    networks.forEach(network => store.dispatch(createNetwork(network)));
    tokens.forEach(token => store.dispatch(createToken(token)));
    store.dispatch(createDefaultSession());
  } else {
    // resolve rehydrated state
    // TODO make this not a hack.
    const addressNetworks = Object.values(store.getState().orm.AddressNetworks.itemsById).reduce((o, val) => ({
      ...o, [val.fromAddressId]: (o[val.fromAddressId] || []).concat(val.toNetworkId),
    }), {});
    const addressTokens = Object.values(store.getState().orm.AddressTokens.itemsById).reduce((o, val) => ({
      ...o, [val.fromAddressId]: (o[val.fromAddressId] || []).concat(val.toTokenId),
    }), {});
    const addressNetworkTokens = Object.keys(addressNetworks).concat(Object.keys(addressTokens)).reduce((o, val) => ({
      ...o, [val]: { address: val, tokens: addressTokens[val] || [], networks: addressNetworks[val] || [] },
    }), {});
    store.getState().orm.Token.items.forEach(token => store.dispatch(deleteToken(token)));
    store.getState().orm.Network.items.forEach(network => store.dispatch(deleteNetwork(network)));
    networks.forEach(network => store.dispatch(createNetwork(network)));
    tokens.forEach(token => store.dispatch(createToken(token)));
    // repopuplate accounts
    Object.values(addressNetworkTokens).forEach(data => store.dispatch(updateAddress(data)));
  }
  // TODO set 'ready' state...
}
