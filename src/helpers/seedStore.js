import { init as initWeb3 } from '~/helpers/web3';
import { createDefaultSession } from '~/actions/session';
import { createKeystoreType } from '~/actions/keystoreType';
import { createNetwork, deleteNetwork } from '~/actions/network';
import { createToken, deleteToken } from '~/actions/token';
import { updateAddress } from '~/actions/address';

import { DEFAULT_KEYSTORE_TYPES, DEFAULT_NETWORKS, DEFAULT_TOKENS } from '~/helpers/constants';

export default function seedStore(store) {
  if (store.getState().orm.Session.items.length === 0) {
    // nothing to restore from, populate defaults...
    DEFAULT_KEYSTORE_TYPES.forEach(keystoreType => store.dispatch(createKeystoreType(keystoreType)));
    DEFAULT_NETWORKS.forEach(network => store.dispatch(createNetwork(network)));
    DEFAULT_TOKENS.forEach(token => store.dispatch(createToken(token)));
    store.dispatch(createDefaultSession());
  } else {
    // resolve rehydrated state
    // TODO optimize this?
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
    DEFAULT_NETWORKS.forEach(network => store.dispatch(createNetwork(network)));
    DEFAULT_TOKENS.forEach(token => store.dispatch(createToken(token)));
    // repopuplate accounts
    Object.values(addressNetworkTokens).forEach(data => store.dispatch(updateAddress(data)));
  }
  // TODO set 'ready' state...
}
