import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LedgerKeystoreTransactionSigner from '../ledger_keystore_transaction_signer';

const address = {
  kdPath: 'kdPath test',
  address: '0x123435',
};

describe('<LedgerKeystoreTransactionSigner />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LedgerKeystoreTransactionSigner
        hideTxSigningModal={jest.fn}
        address={address}
        txData={{}}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
