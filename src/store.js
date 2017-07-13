/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as cryptoPrices } from '@digix/redux-crypto-prices/src';
import { reducer as web3Redux } from 'web3-redux';
import kycSystem from '@digix/kyc-system/spectrum/reducer';

import { reducer as orm } from '~/models';
import { init as initWeb3 } from '~/helpers/web3';
import { createDefaultSession } from '~/actions/session';
import { createKeystoreType } from '~/actions/keystoreType';
import { createNetwork, deleteNetwork } from '~/actions/network';
import { createToken, deleteToken } from '~/actions/token';
import { updateAddress } from '~/actions/address';
import { DEFAULT_KEYSTORE_TYPES, DEFAULT_NETWORKS, DEFAULT_TOKENS } from '~/helpers/constants';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Below is a WIP HACK before implementing temporary persistence layer for dev mode
// toggle `persist` to disable
const persist = true;

const enhancers = persist ?
  composeEnhancers(autoRehydrate(), applyMiddleware(thunk)) :
  composeEnhancers(applyMiddleware(thunk));

const reducers = combineReducers({ kycSystem, web3Redux, orm, cryptoPrices });
const store = createStore(reducers, {}, enhancers);

function seedStore() {
  if (store.getState().orm.Session.items.length === 0) {
    store.dispatch(createDefaultSession());
    DEFAULT_KEYSTORE_TYPES.forEach(keystoreType => store.dispatch(createKeystoreType(keystoreType)));
    DEFAULT_NETWORKS.forEach(network => store.dispatch(createNetwork(network)));
    DEFAULT_TOKENS.forEach(token => store.dispatch(createToken(token)));
  } else {
    // TODO this is for dev mode only, remove in production (as we want to keep these)
    // get the old linkages
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
  initWeb3(store);
}

// initialize the store
if (persist) {
  persistStore(store, {
    whitelist: ['orm'], keyPrefix: 'DIGIX_SPECTRUM_',
  }, seedStore);
} else {
  seedStore();
}

export default store;
