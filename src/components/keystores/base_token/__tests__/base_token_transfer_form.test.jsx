import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BaseTokenTransferForm from '../base_token_transfer_form';

const web3 = {
  eth: {
    getBalance: jest.fn,
    balance: () => ({
      minus: () => ({
        shift: () => ({}),
      }),
    }),
  },
};

const network = {
  symbol: 'GBP',
  color: 'blue',
};

const formData = {
  from: '0x1234',
  gas: 1000,
  gasPrice: 10,
};

describe('<BaseTokenTransferForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenTransferForm
        formChange={jest.fn}
        formData={formData}
        web3={web3}
        network={network}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
