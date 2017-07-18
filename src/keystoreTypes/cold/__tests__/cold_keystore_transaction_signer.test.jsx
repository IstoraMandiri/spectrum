import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ColdKeystoreTransactionSigner from '../cold_keystore_transaction_signer';

const txData = {
  to: '0x54341',
  from: '0x543535',
  data: {},
  value: 10,
  nonce: 10,
  gas: 100000,
  gasPrice: 2,
  chainId: 1,
};

describe('<ColdKeystoreTransactionSigner />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ColdKeystoreTransactionSigner
        txData={txData}
        hideTxSigningModal={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
