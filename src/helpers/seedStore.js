import { createDefaultSession } from '~/actions/session';
import { createKeystoreType } from '~/actions/keystoreType';
import { createNetwork, deleteNetwork } from '~/actions/network';
import { createToken, deleteToken } from '~/actions/token';
import { updateAddress } from '~/actions/address';

import { init as initWeb3 } from '~/helpers/web3';

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
  const state = store.getState();
  if (state.orm.Session.items.length === 0) {
    console.log('restoring defaults');
    // nothing to restore from, populate defaults...
    DEFAULT_KEYSTORE_TYPES.forEach(keystoreType => store.dispatch(createKeystoreType(keystoreType)));
    networks.forEach(network => store.dispatch(createNetwork(network)));
    tokens.forEach(token => store.dispatch(createToken(token)));
    store.dispatch(createDefaultSession());
  } else {
    // resolve rehydrated state
    console.log('restoring previous');
    // TODO make this not a hack?
    // const addressNetworks = Object.values(state.orm.AddressNetworks.itemsById).reduce((o, val) => ({
    //   ...o, [val.fromAddressId]: (o[val.fromAddressId] || []).concat(val.toNetworkId),
    // }), {});
    // const addressTokens = Object.values(state.orm.AddressTokens.itemsById).reduce((o, val) => ({
    //   ...o, [val.fromAddressId]: (o[val.fromAddressId] || []).concat(val.toTokenId),
    // }), {});
    // const addressNetworkTokens = Object.keys(addressNetworks).concat(Object.keys(addressTokens)).reduce((o, val) => ({
    //   ...o, [val]: { address: val, tokens: addressTokens[val] || [], networks: addressNetworks[val] || [] },
    // }), {});
    // store.getState().orm.Token.items.forEach(token => store.dispatch(deleteToken(token)));
    // store.getState().orm.Network.items.forEach(network => store.dispatch(deleteNetwork(network)));
    // networks.forEach(network => store.dispatch(createNetwork(network)));
    // tokens.forEach(token => store.dispatch(createToken(token)));
    // repopuplate accounts
    // Object.values(addressNetworkTokens).forEach(data => store.dispatch(updateAddress(data)));
    initWeb3(store);
  }
  // TODO set 'ready' state...
}
