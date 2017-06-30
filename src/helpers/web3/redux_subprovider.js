import { getAddresses, getNetworks } from '~/selectors';
import HookedWalletEthTx from 'web3-provider-engine/subproviders/hooked-wallet-ethtx';

import { showTxSigningModal } from '~/actions/session';

export default class ReduxSubProvider extends HookedWalletEthTx {
  constructor({ store, networkId }, opts) {
    super({
      ...opts,
      getAccounts(cb) {
        // TODO filter by networkId?
        const addresses = getAddresses(store.getState()).map(a => a.address);
        cb(null, addresses);
      },
    });
    this.sanitizeData = (txData, network) => ({
      to: txData.to,
      from: txData.from,
      gas: txData.gas || txData.gasLimit,
      gasPrice: txData.gasPrice,
      value: txData.value || '0x00',
      data: txData.data || '',
      nonce: txData.nonce,
      chainId: (txData.chainId && parseInt(txData.chainId, 10)) || (network.chainId && parseInt(network.chainId, 10)),
    });
    // overriding https://github.com/MetaMask/provider-engine/blob/master/subproviders/hooked-wallet-ethtx.js
    this.signTransaction = ({ ui, ...data }, cb) => {
      const network = (getNetworks(store.getState()).find(({ id }) => id === networkId) || {});
      const txData = this.sanitizeData(data, network);
      const address = getAddresses(store.getState()).find(a => a.address === txData.from);
      store.dispatch(showTxSigningModal({ address, txData, ui, network })).then(({ signedTx }) => {
        cb(null, signedTx);
      }).catch(cb);
    };
  }
}
