import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BaseTokenBalance from '../base_token_balance';

jest.mock('../../../../helpers/stringUtils', () => ({
  parseBigNumber: () => 20,
}));

const web3 = {
  eth: {
    getBalance: jest.fn,
    balance: () => 10,
  },
};

describe('<BaseTokenBalance />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenBalance
        web3={web3}
        network={{}}
        address={{
          address: '0x34346f',
        }}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
