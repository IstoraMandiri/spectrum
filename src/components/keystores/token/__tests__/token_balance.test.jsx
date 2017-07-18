import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TokenBalance from '../token_balance';

jest.mock('../../../../helpers/stringUtils', () => ({
  parseBigNumber: () => 20,
}));

const token = {
  decimals: 2,
};

const address = {
  address: '0x5434132',
};

const contract = {
  balanceOf: () => 10,
};

describe('<TokenBalance />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TokenBalance
        contract={contract}
        address={address}
        token={token}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
