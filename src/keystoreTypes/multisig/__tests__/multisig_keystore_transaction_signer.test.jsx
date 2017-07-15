jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreTransactionSigner from '../multisig_keystore_transaction_signer';

const web3Redux = {
  web3: () => ({
    isConnected: () => true,
    eth: {
      contract: () => ({
        at: () => ({}),
      }),
    },
  }),
};

const network = {
  id: 1,
};

describe('<MultisigKeystoreTransactionSigner />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreTransactionSigner
        web3Redux={web3Redux}
        network={network}
        txData={{}}
        addresses={[]}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
