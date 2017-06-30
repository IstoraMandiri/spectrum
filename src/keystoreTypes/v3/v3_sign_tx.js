import Wallet from 'ethereumjs-wallet';
import EthTx from 'ethereumjs-tx';

export default function v3SignTx({ txData, keystore, password }) {
  return new Promise((resolve) => {
    let privateKey = Wallet.fromV3(keystore.data, password).getPrivateKey();
    const tx = new EthTx(txData);
    console.log('signing', txData);
    tx.sign(privateKey);
    privateKey = null;
    const signedTx = `0x${tx.serialize().toString('hex')}`;
    resolve({ signedTx });
  });
}
