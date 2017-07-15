import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TokenTransfer from '../token_transfer';

jest.mock('../../../../helpers/stringUtils', () => ({
  toBigNumber: () => 20,
}));

const contract = {
  transfer: {
    sendTransaction: jest.fn,
  },
  balanceOf: jest.fn,
};

const token = {
  decimals: 2,
  name: 'test token',
};

describe('<TokenTransfer />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TokenTransfer
        trigger={<div />}
        contract={contract}
        token={token}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
