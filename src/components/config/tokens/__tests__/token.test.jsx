jest.mock('../../../../helpers/blockie');

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Token from '../token';

const token = {
  id: 1,
  name: 'Test token',
  address: '0x123f43ddd',
  network: {
    id: 1,
    name: 'Test network',
    color: 'blue',
  },
  symbol: 'GBP',
};

describe('<Token />', () => {
	test('renders correctly', () => {
    const component = shallow(
      <Token 
        token={token}
        updateToken={jest.fn}
        deleteToken={jest.fn}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
	});
});