jest.mock('../../../helpers/blockie');

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Address from '../address';

const address = {
  address: '0x12345',
  name: 'test address',
};

describe('<Address />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Address address={address} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
