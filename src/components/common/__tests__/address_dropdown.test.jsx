import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddressDropdown from '../address_dropdown';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const addresses = [{
  name: 'address 1',
  address: 'address test 1',
}, {
  name: 'address 2',
  address: 'address test 2',
}, {
  name: 'address 3',
  address: 'address test 4',
}];

describe('<AddressDropdown />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <AddressDropdown
        addresses={addresses}
        value="none"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders correctly with matching value', () => {
    const component = shallow(
      <AddressDropdown
        addresses={addresses}
        value="address test 4"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
