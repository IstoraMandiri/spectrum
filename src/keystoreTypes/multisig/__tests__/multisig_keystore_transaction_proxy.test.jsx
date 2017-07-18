import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreTransactionProxy from '../multisig_keystore_transaction_proxy';

const contract = {
  address: '0x12345',
  submitTransaction: {
    getData: () => ({}),
  },
};

const addresses = [{
  address: '0x54325',
}, {
  address: '0x6423466',
}];

describe('<MultisigKeystoreTransactionProxy />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreTransactionProxy
        contract={contract}
        addresses={addresses}
        txData={{}}
        web3={{}}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
