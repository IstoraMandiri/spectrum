/* eslint global-require:0 */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddressBalances from '../address_balances';

jest.mock('../../../helpers/web3/connect', () => require('../../../../test/__mocks__/connectMock'));

const address = {
  networks: [{
    id: 1,
  }, {
    id: 2,
  }],
  tokens: [{
    id: 1,
  }, {
    id: 2,
  }],
};

describe('<AddressBalances />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <AddressBalances
        address={address}
        web3Redux={{}}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
