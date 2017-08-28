import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine/index';

// TODO add some more providers
import { setNetwork } from 'web3-redux/src/actions';
import { getNetworks, getDefaultAddress } from '~/selectors';

import FilterSubProvider from 'web3-provider-engine/subproviders/filters';

import ReduxSubProvider from './redux_subprovider';
import RpcProvider from './rpc_subprovider';

export default function generateWeb3(store, network) {
  // import store getters...
  if (!network.provider) { return null; }
  // TODO set poll speed based on network configs
  const providerEngine = new ProviderEngine({ pollingInterval: 4 * 1000 });
  providerEngine.addProvider(new FilterSubProvider());
  providerEngine.addProvider(new ReduxSubProvider({ store, networkId: network.id }));
  providerEngine.addProvider(new RpcProvider({ rpcUrl: network.provider }));
  return new Web3(providerEngine);
}

export function sync(store, network) {
  const web3 = network.enabled && generateWeb3(store, network);
  return store.dispatch(setNetwork({
    web3,
    networkId: network.id,
    getDefaultAddress() {
      return (getDefaultAddress(store.getState()) || {}).address;
    },
  }));
}

export function init(store) {
  getNetworks(store.getState()).forEach(network => sync(store, network));
}
