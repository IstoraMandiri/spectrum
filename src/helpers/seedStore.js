import { createDefaultSession } from '~/actions/session';
import { createKeystoreType } from '~/actions/keystoreType';
import { createNetwork } from '~/actions/network';
import { createToken } from '~/actions/token';

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
    // if we did not rehydrate
    console.log('initializing defaults');
    DEFAULT_KEYSTORE_TYPES.forEach(keystoreType => store.dispatch(createKeystoreType(keystoreType)));
    networks.forEach(network => store.dispatch(createNetwork(network)));
    tokens.forEach(token => store.dispatch(createToken(token)));
    store.dispatch(createDefaultSession());
  } else {
    console.log('restoring previous session');
    initWeb3(store);
  }
}
